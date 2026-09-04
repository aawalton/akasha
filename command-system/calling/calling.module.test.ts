import { afterAll, expect, test } from "bun:test"
import { mkdirSync, rmSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { idFiled, idTakenFrom, listedFiled, noneOfTypeFiled } from "@akasha/indexes/testing"
import { scratchWorld } from "../scratching/scratching.module.code.ts"
import { calling, commandsIn, HELP, HELP_SHORT, type Surface } from "./calling.module.code.ts"

const COMMAND = "command"

const COMMAND_TYPE = "01a04bdd-596d-7b81-9204-1a882f474a5f"

const ANSWERS = `export function held(argv, given) {
  return { report: [argv.join(" "), given.calledAs], refusals: [], code: 0 }
}
`

const ANSWERS_NOTHING = `export const held = 1\n`

const WILL_NOT_LOAD = `export function held( {\n`

const THROWS_NO_ERROR = `throw "the value was never set"\n`

const scratch = scratchWorld()

afterAll(scratch.sweep)

function rootWith(
  named: readonly {
    readonly slug: string
    readonly body: string
    readonly also?: string
    readonly definition?: string
    readonly surface?: Surface
  }[],
  typeSlug: string = COMMAND
): string {
  const root = scratch.rootFor("akasha-calling-")
  noneOfTypeFiled(root, typeSlug)
  idFiled(root, COMMAND_TYPE, [
    { path: `akasha/command-system/command/${typeSlug}.page-type.ts`, id: COMMAND_TYPE },
  ])
  let minted = 0
  for (const one of named) {
    const at = `akasha/command-system/command/${one.slug}/${one.slug}.command.ts`
    mkdirSync(join(root, at.slice(0, at.lastIndexOf("/"))), { recursive: true })
    const stated =
      one.definition === undefined ? "" : `, definition: ${JSON.stringify(one.definition)}`
    const shown =
      one.surface === undefined
        ? ""
        : `, taking: ${JSON.stringify(one.surface.taking)}, helpNotes: ${JSON.stringify(one.surface.helpNotes)}`
    writeFileSync(
      join(root, at),
      `export const ${one.slug} = { slug: "${one.slug}"${stated}${shown} }\n`
    )
    writeFileSync(join(root, `${at.slice(0, -".ts".length)}.code.ts`), one.body)
    minted = minted + 1
    const lines = [{ path: at, id: `01a04bdd-0000-7000-8000-00000000000${minted}` }]
    if (one.also !== undefined) {
      lines.push({ path: one.also, id: "01a04bdd-0000-7000-8000-000000000099" })
    }
    listedFiled(root, typeSlug, one.slug, lines)
  }
  return root
}

const OUTSIDE = { calledAs: "akasha", from: "/nowhere", writer: null, agentId: null }

test("a command is found through the index and handed the rest of the line", async () => {
  const root = rootWith([{ slug: "held", body: ANSWERS }])
  const said = await calling(["held", "one", "two"], { ...OUTSIDE, root })
  expect(said.code).toBe(0)
  expect(said.report[0]).toBe("one two")
  expect(said.report[1]).toBe("akasha held")
})

test("a command is found though the page type saying what one is carries another slug", async () => {
  const root = rootWith([{ slug: "held", body: ANSWERS }], "instruction")
  const said = await calling(["held", "one"], { ...OUTSIDE, root })
  expect(said.code).toBe(0)
  expect(said.report[0]).toBe("one")
})

test("an index naming no page that says which pages are commands says so", async () => {
  const root = rootWith([{ slug: "held", body: ANSWERS }])
  idTakenFrom(root, COMMAND_TYPE)
  const said = await calling(["held"], { ...OUTSIDE, root })
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain(`carries the id \`${COMMAND_TYPE}\``)
  expect(said.refusals[0]).toContain("nothing says which pages are commands")
  expect(said.refusals[0]).not.toContain("carries no command")
})

test("naming no command is answered with the commands there are", async () => {
  const root = rootWith([{ slug: "held", body: ANSWERS }])
  const said = await calling([], { ...OUTSIDE, root })
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("takes a command")
  expect(said.refusals[0]).toContain("akasha held")
})

test("a name no command carries is refused, and the commands are listed", async () => {
  const root = rootWith([{ slug: "held", body: ANSWERS }])
  const said = await calling(["nowhere"], { ...OUTSIDE, root })
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("`nowhere` is no command akasha carries")
})

test("a name carried by more than one command is refused rather than chosen between", async () => {
  const root = rootWith([{ slug: "held", body: ANSWERS, also: "akasha/elsewhere/held.command.ts" }])
  const said = await calling(["held"], { ...OUTSIDE, root })
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("names more than one")
})

test("a command page whose code answers to nothing callable is refused", async () => {
  const root = rootWith([{ slug: "held", body: ANSWERS_NOTHING }])
  const said = await calling(["held"], { ...OUTSIDE, root })
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("answers to nothing that can be called")
})

test("a command page whose code will not load is refused with why, not with a guess", async () => {
  const root = rootWith([{ slug: "held", body: WILL_NOT_LOAD }])
  const said = await calling(["held"], { ...OUTSIDE, root })
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("could not be loaded — ")
  expect(said.refusals[0]).not.toContain("answers to nothing")
})

test("a command page throwing what is no Error is still refused with what it said", async () => {
  const root = rootWith([{ slug: "held", body: THROWS_NO_ERROR }])
  const said = await calling(["held"], { ...OUTSIDE, root })
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("could not be loaded — the value was never set")
})

const ANSWERS_LATER = `export async function held(argv, given) {
  await new Promise((keep) => setTimeout(keep, 1))
  return { report: [argv.join(" "), given.calledAs], refusals: [], code: 0 }
}
`

test("a command answering later is waited for rather than handed back as it stands", async () => {
  const root = rootWith([{ slug: "held", body: ANSWERS_LATER }])
  const said = await calling(["held", "one"], { ...OUTSIDE, root })
  expect(said.code).toBe(0)
  expect(said.report[0]).toBe("one")
  expect(said.report[1]).toBe("akasha held")
})

const ROOTED_AT = "akasha/command-system/commands/index/index.command.ts"

function rooted(root: string): undefined {
  const at = join(root, ROOTED_AT)
  mkdirSync(join(at, ".."), { recursive: true })
  writeFileSync(at, 'export const index = { slug: "index" }\n')
  writeFileSync(
    `${at.slice(0, -".ts".length)}.code.ts`,
    "export function index(argv, given) {\n" +
      '  return { report: [argv.join(" "), given.calledAs], refusals: [], code: 0 }\n' +
      "}\n"
  )
}

test("the command that repairs the index is found with no index at all", async () => {
  const root = rootWith([{ slug: "held", body: ANSWERS }])
  rooted(root)
  rmSync(join(root, ".git"), { recursive: true })
  const said = await calling(["index", "refresh"], { ...OUTSIDE, root })
  expect(said.code).toBe(0)
  expect(said.report[0]).toBe("refresh")
  expect(said.report[1]).toBe("akasha index")
})

test("the command that repairs the index is found though the index names no page type", async () => {
  const root = rootWith([{ slug: "held", body: ANSWERS }])
  rooted(root)
  idTakenFrom(root, COMMAND_TYPE)
  const said = await calling(["index", "refresh"], { ...OUTSIDE, root })
  expect(said.code).toBe(0)
  expect(said.report[0]).toBe("refresh")
})

test("a command found by its path is listed though the index names it nowhere", async () => {
  const root = rootWith([{ slug: "held", body: ANSWERS }])
  rooted(root)
  const said = await calling([], { ...OUTSIDE, root })
  expect(said.refusals[0]).toContain("akasha index")
  expect(said.refusals[0]).toContain("akasha held")
})

test("a name looked for where no index stands is answered as unread, not as uncarried", async () => {
  const root = rootWith([{ slug: "held", body: ANSWERS }])
  rmSync(join(root, ".git"), { recursive: true })
  const said = await calling(["held"], { ...OUTSIDE, root })
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("was looked for and not read")
  expect(said.refusals[0]).not.toContain("is no command akasha carries")
})

test("the commands there are come from the index", () => {
  const root = rootWith([
    { slug: "held", body: ANSWERS },
    { slug: "other", body: ANSWERS },
  ])
  expect(commandsIn(root)).toEqual(["held", "other"])
})

const SURFACED: Surface = {
  taking: [{ said: "--file-path <path>", takes: "a path it takes" }],
  helpNotes: ["it repeats."],
}

test("asking for help lists the commands with what each page says it is for", async () => {
  const root = rootWith([{ slug: "held", body: ANSWERS, definition: "what held is for" }])
  const said = await calling([HELP], { ...OUTSIDE, root })
  expect(said.code).toBe(0)
  expect(said.refusals).toEqual([])
  expect(said.report).toContain("  akasha held  what held is for")
  expect(said.report).toContain("say `akasha <command> --help` for what one takes")
})

test("`-h` says what `--help` says", async () => {
  const root = rootWith([{ slug: "held", body: ANSWERS, definition: "what held is for" }])
  expect(await calling([HELP_SHORT], { ...OUTSIDE, root })).toEqual(
    await calling([HELP], { ...OUTSIDE, root })
  )
})

test("a command whose page states no definition is listed by name alone", async () => {
  const root = rootWith([{ slug: "held", body: ANSWERS }])
  const said = await calling([HELP], { ...OUTSIDE, root })
  expect(said.code).toBe(0)
  expect(said.report).toContain("  akasha held")
})

test("a command answers for help out of the surface its own page states", async () => {
  const root = rootWith([
    { slug: "held", body: ANSWERS, definition: "what held is for", surface: SURFACED },
  ])
  const said = await calling(["held", HELP], { ...OUTSIDE, root })
  expect(said.code).toBe(0)
  expect(said.refusals).toEqual([])
  expect(said.report[0]).toBe("akasha held — what held is for")
  expect(said.report).toContain("  --file-path <path>  a path it takes")
  expect(said.report).toContain("it repeats.")
})

test("a command stating no surface is handed the flag to answer for itself", async () => {
  const root = rootWith([{ slug: "held", body: ANSWERS }])
  const said = await calling(["held", HELP], { ...OUTSIDE, root })
  expect(said.code).toBe(0)
  expect(said.report[0]).toBe("--help")
})

test("a name no command carries is told where the surface is written down", async () => {
  const root = rootWith([{ slug: "held", body: ANSWERS }])
  const said = await calling(["nowhere"], { ...OUTSIDE, root })
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("Say `akasha --help` for what each of them takes.")
})

const SAYS_KIND = `export function held(argv, given) {
  return { report: [JSON.stringify(given.changeKind ?? null)], refusals: [], code: 0 }
}
`

const CARRIED = { slug: "change-mechanical", runsChecks: false, runsWarrants: false }

test("the change kind a call already carries is what the command is handed", async () => {
  const root = rootWith([{ slug: "held", body: SAYS_KIND }])
  const said = await calling(["held"], { ...OUTSIDE, root, changeKind: CARRIED })
  expect(said.code).toBe(0)
  expect(said.report[0]).toBe(JSON.stringify(CARRIED))
})

test("a change kind no page states is handed as none, so everything runs", async () => {
  const root = rootWith([{ slug: "held", body: SAYS_KIND }])
  const said = await calling(["held"], { ...OUTSIDE, root })
  expect(said.code).toBe(0)
  expect(said.report[0]).toBe("null")
})
