import { afterAll, expect, test } from "bun:test"
import { mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { DataError, EXIT, InputError, OperationalError } from "@akasha/errors-core/exit-code"
import { akashaRoot } from "@akasha/pages-system/checkout-roots"
import type {
  CommandDocument,
  CommandModule,
} from "../command-declaring/command-declaring.module.code.ts"
import { scratchWorld } from "../scratching/scratching.module.code.ts"
import type { Ending, OpsWorld } from "./ops-calling.module.code.ts"
import {
  ignoreClosedConsumerWrites,
  opsAnswered,
  opsDocumentsIn,
  opsEntryAt,
  opsKnownPrefix,
  opsLeaving,
  opsListing,
  opsMatchIn,
  opsSiblingHint,
  opsUnder,
} from "./ops-calling.module.code.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

const SEAT_RESUME: CommandDocument = {
  slug: "here-seat-resume",
  path: ["seat", "resume"],
  entryFile: "commands/seat/resume.ts",
  summary: "put a seat back",
}

const SEAT_START: CommandDocument = {
  slug: "here-seat-start",
  path: ["seat", "start"],
  entryFile: "commands/seat/start.ts",
  summary: "start a seat",
}

const PAGE_UNLANDED: CommandDocument = {
  slug: "here-page-unlanded",
  path: ["page", "unlanded"],
  entryFile: "unlanded.ts",
  summary: "name what has not landed",
}

const BODY_IMPORTING_NOTHING =
  "export default async function ran(args) {\n" +
  '  process.stdout.write(`here ${args.join(" ")}\\n`)\n' +
  "}\n"

const BODY_CHILD =
  'export const tool = { name: "unlanded" }\nif (import.meta.main) console.log("ran")\n'

interface Watched {
  readonly world: OpsWorld
  readonly said: string[]
  readonly refused: string[]
  readonly childRuns: { at: string; args: readonly string[] }[]
  readonly imports: string[]
}

function fileAt(root: string, relative: string, body: string): string {
  const at = join(root, relative)
  mkdirSync(dirname(at), { recursive: true })
  writeFileSync(at, body)
  return at
}

function watchedWorld(
  root: string,
  documents: readonly CommandDocument[],
  childCode: number = EXIT.OK,
  loaded: CommandModule | null = null
): Watched {
  const said: string[] = []
  const refused: string[] = []
  const childRuns: { at: string; args: readonly string[] }[] = []
  const imports: string[] = []
  return {
    said,
    refused,
    childRuns,
    imports,
    world: {
      root,
      documents,
      sourceOf: (at) => {
        try {
          return readFileSync(at, "utf8")
        } catch {
          return null
        }
      },
      loading: async (at) => {
        imports.push(at)
        return loaded ?? ((await import(at)) as CommandModule)
      },
      running: (at, args) => {
        childRuns.push({ at, args })
        return Promise.resolve(childCode)
      },
      asking: () => Promise.resolve(""),
      saying: (text) => {
        said.push(text)
      },
      refusing: (text) => {
        refused.push(text)
      },
    },
  }
}

function throwing(thrown: unknown): CommandModule {
  return {
    default: () => Promise.reject(thrown),
  }
}

test("a page's words reach the command and what is left goes to it", () => {
  const found = opsMatchIn(
    [SEAT_RESUME, SEAT_START],
    ["seat", "resume", "01a0-one", "--verify", "--json"]
  )
  expect(found?.document.slug).toBe("here-seat-resume")
  expect(found?.rest).toEqual(["01a0-one", "--verify", "--json"])
})

test("a name no page carries reaches no command", () => {
  expect(opsMatchIn([SEAT_RESUME], ["seat", "record", "one"])).toBeNull()
})

test("the commands under a prefix are the ones whose words begin with it", () => {
  const under = opsUnder([SEAT_RESUME, SEAT_START, PAGE_UNLANDED], ["seat"])
  expect(under.map((one) => one.slug)).toEqual(["here-seat-resume", "here-seat-start"])
})

test("a word under no command falls back to the longest prefix that carries one", () => {
  expect(opsKnownPrefix([SEAT_RESUME, SEAT_START], ["seat", "record"])).toEqual(["seat"])
  expect(opsKnownPrefix([SEAT_RESUME], ["nowhere", "at", "all"])).toEqual([])
})

test("the listing names every command under the prefix", () => {
  const listing = opsListing(["seat"], [SEAT_RESUME, SEAT_START])
  expect(listing).toContain("Usage: ops seat <command> [flags]")
  expect(listing).toContain("seat resume")
  expect(listing).toContain("put a seat back")
})

test("a file declaring a default export runs in the dispatcher's own process", async () => {
  const root = scratch.rootFor("ops-here-")
  const at = fileAt(root, SEAT_RESUME.entryFile, BODY_IMPORTING_NOTHING)
  const watched = watchedWorld(root, [SEAT_RESUME])

  const wrote: string[] = []
  const stood = process.stdout.write.bind(process.stdout)
  process.stdout.write = ((text: string) => {
    wrote.push(String(text))
    return true
  }) as typeof process.stdout.write
  let ending: Ending
  try {
    ending = await opsAnswered(["seat", "resume", "01a0-one", "--json"], watched.world)
  } finally {
    process.stdout.write = stood
  }

  expect(ending).toEqual({ ended: "done" })
  expect(watched.childRuns).toEqual([])
  expect(watched.imports).toEqual([at])
  expect(watched.childRuns).toEqual([])
  expect(wrote).toEqual(["here 01a0-one --json\n"])
})

test("a file declaring no default export is run as a child with what is left", async () => {
  const root = scratch.rootFor("ops-child-")
  const at = fileAt(root, PAGE_UNLANDED.entryFile, BODY_CHILD)
  const watched = watchedWorld(root, [PAGE_UNLANDED])

  const ending = await opsAnswered(["page", "unlanded", "--json"], watched.world)

  expect(ending).toEqual({ ended: "done" })
  expect(watched.imports).toEqual([])
  expect(watched.childRuns).toEqual([{ at, args: ["--json"] }])
})

test("a child's exit code is passed back unchanged", async () => {
  const root = scratch.rootFor("ops-code-")
  fileAt(root, PAGE_UNLANDED.entryFile, BODY_CHILD)
  const watched = watchedWorld(root, [PAGE_UNLANDED], 7)

  expect(await opsAnswered(["page", "unlanded"], watched.world)).toEqual({
    ended: "child",
    code: 7,
  })
})

test("a child answering nothing wrong ends the call rather than setting a code", async () => {
  const root = scratch.rootFor("ops-zero-")
  fileAt(root, PAGE_UNLANDED.entryFile, BODY_CHILD)
  const watched = watchedWorld(root, [PAGE_UNLANDED], EXIT.OK)

  expect(await opsAnswered(["page", "unlanded"], watched.world)).toEqual({ ended: "done" })
})

test("what a command running here throws says which kind of thing went wrong", async () => {
  const kinds: readonly (readonly [unknown, number])[] = [
    [new InputError("said input"), EXIT.INPUT],
    [new DataError("said data"), EXIT.DATA],
    [new OperationalError("said operational"), EXIT.OPERATIONAL],
    [new Error("said nothing about itself"), EXIT.UNCLASSIFIED],
  ]
  const root = scratch.rootFor("ops-threw-")
  fileAt(root, SEAT_RESUME.entryFile, BODY_IMPORTING_NOTHING)
  for (const [thrown, code] of kinds) {
    const watched = watchedWorld(root, [SEAT_RESUME], EXIT.OK, throwing(thrown))
    const ending = await opsAnswered(["seat", "resume"], watched.world)
    expect(ending.ended).toBe("threw")
    expect(ending.ended === "threw" ? ending.code : -1).toBe(code)
    expect(ending.ended === "threw" ? ending.said : "").toContain(
      thrown instanceof Error ? thrown.message : ""
    )
  }
})

test("a page naming a file that is not there is answered by naming that file", async () => {
  const root = scratch.rootFor("ops-gone-")
  const watched = watchedWorld(root, [SEAT_RESUME])
  const ending = await opsAnswered(["seat", "resume"], watched.world)
  expect(ending.ended).toBe("threw")
  expect(ending.ended === "threw" ? ending.code : -1).toBe(EXIT.OPERATIONAL)
  expect(ending.ended === "threw" ? ending.said : "").toContain(SEAT_RESUME.entryFile)
})

test("a word no command carries is a caller's mistake, and the listing goes to the error stream", async () => {
  const root = scratch.rootFor("ops-unknown-")
  const watched = watchedWorld(root, [SEAT_RESUME, SEAT_START])
  const ending = await opsAnswered(["seat", "record"], watched.world)
  expect(ending.ended).toBe("threw")
  expect(ending.ended === "threw" ? ending.code : -1).toBe(EXIT.INPUT)
  expect(watched.said).toEqual([])
  expect(watched.refused.join("\n")).toContain("seat resume")
})

test("a prefix that carries commands is answered with them on the answer stream", async () => {
  const root = scratch.rootFor("ops-listing-")
  const watched = watchedWorld(root, [SEAT_RESUME, SEAT_START])
  expect(await opsAnswered(["seat"], watched.world)).toEqual({ ended: "done" })
  expect(watched.said.join("")).toContain("seat start")
  expect(watched.refused).toEqual([])
})

test("a sibling carrying the flag that was refused is named", () => {
  const hint = opsSiblingHint("--json", [{ path: ["seat", "start"], names: ["--json"] }])
  expect(hint).toBe("(did you mean ops seat start --json?)")
  expect(
    opsSiblingHint("--json", [{ path: ["seat", "start"], names: ["--force"] }])
  ).toBeUndefined()
})

test("a write to a consumer that has closed is let go and anything else is not", () => {
  const listeners: ((thrown: NodeJS.ErrnoException) => void)[] = []
  ignoreClosedConsumerWrites([
    {
      on: (_event, listener) => {
        listeners.push(listener)
        return undefined
      },
    },
  ])
  const closed = Object.assign(new Error("write EPIPE"), { code: "EPIPE" })
  expect(() => listeners[0]?.(closed)).not.toThrow()
  const other = Object.assign(new Error("write EACCES"), { code: "EACCES" })
  expect(() => listeners[0]?.(other)).toThrow("write EACCES")
})

test("the seat resume vector a live service builds reaches the file its page names", () => {
  const root = akashaRoot()
  const documents = opsDocumentsIn(root)
  const found = opsMatchIn(documents, ["seat", "resume", "01a0-one", "--verify", "--json"])
  expect(found?.document.path).toEqual(["seat", "resume"])
  expect(found?.rest).toEqual(["01a0-one", "--verify", "--json"])
  expect(found?.document.entryFile).toBe("seat-system/seat-resume/seat-resume.module.code.ts")
  const at = found === null ? null : opsEntryAt(root, found.document)
  expect(at).not.toBeNull()
  expect(readFileSync(at ?? "", "utf8")).toMatch(/^export default\b/m)
})

test("every ops-command page names a file that is there", () => {
  const root = akashaRoot()
  const documents = opsDocumentsIn(root)
  expect(documents.length).toBeGreaterThan(0)
  const missing = documents.filter((one) => opsEntryAt(root, one) === null)
  expect(missing.map((one) => one.slug)).toEqual([])
})

test("a refusal ends the process at once and says why", () => {
  expect(opsLeaving({ ended: "threw", said: "ops: unknown command", code: EXIT.INPUT })).toEqual({
    code: EXIT.INPUT,
    said: "ops: unknown command",
    atOnce: true,
  })
})

test("a child's code is set rather than exited on, so the streams empty first", () => {
  expect(opsLeaving({ ended: "child", code: 7 })).toEqual({
    code: 7,
    said: null,
    atOnce: false,
  })
})

test("a call that did what it was asked leaves nothing behind it", () => {
  expect(opsLeaving({ ended: "done" })).toEqual({ code: EXIT.OK, said: null, atOnce: false })
})
