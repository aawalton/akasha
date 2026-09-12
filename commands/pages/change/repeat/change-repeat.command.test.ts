import { afterAll, expect, test } from "bun:test"
import { OperationalError } from "akasha/alan/harness/errors-core/exit-code/exit-code.module.code.ts"
import { answering } from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import {
  NOTHING,
  piping,
} from "akasha/commands/modules/change-running/change-running.module.test-fixtures.ts"
import {
  changeRepeat,
  cliAt,
  committedIn,
  lined,
  type Running,
  repeating,
  saidBy,
  takesAtMost,
} from "akasha/commands/pages/change/repeat/change-repeat.command.code.ts"
import {
  idOf,
  indexedRepo,
  pageOf,
  scratch,
} from "akasha/pages/indexes/fixture-world/fixture-world.module.code.ts"

afterAll(scratch.sweep)

const CLI_PAGE = "akasha/held/cli.module.ts"

const CLI_CODE = "akasha/held/cli.module.code.ts"

const WIDE_PAGE = "akasha/held/wide.change-agent.ts"

const NARROW_PAGE = "akasha/held/narrow.change-agent.ts"

const HELD: Readonly<Record<string, string>> = {
  [CLI_PAGE]: pageOf({
    id: idOf("d"),
    pageTypeSlug: "module",
    slug: "cli",
    definition: "the name on the path answered",
    code: "ts",
  }),
  [CLI_CODE]: "export const cli = 1\n",
  [WIDE_PAGE]: pageOf({
    id: idOf("e"),
    pageTypeSlug: "change-agent",
    slug: "wide",
    definition: "a change acting on many pages at once",
    code: "ts",
    takesAtMost: true,
  }),
  [NARROW_PAGE]: pageOf({
    id: idOf("f"),
    pageTypeSlug: "change-agent",
    slug: "narrow",
    definition: "a change acting on one page",
    code: "ts",
  }),
}

const ASKED = "page-type: module\nat-most: 2\n"

const NOTHING_LEFT = "no `module` carries `pageTypeSlug`"

function givenAt(root: string): Given {
  return { root, calledAs: "akasha change repeat", from: root, writer: null, agentId: null }
}

const DROPS = ["change", "drop"]

function landing(commits: readonly string[], reached: string[][] = []): Running {
  let at = 0
  return (argv, given) => {
    reached.push([...argv, given])
    if (argv[1] === "drop") return { code: 0, out: ["these edits are gone"], err: [] }
    const one = commits[at]
    at += 1
    if (one === undefined) return { code: 1, out: [], err: [NOTHING_LEFT] }
    return { code: 0, out: ["landed a/b.ts", `committed as ${one}`], err: [] }
  }
}

function throwingAfter(commits: readonly string[]): Running {
  let at = 0
  return (argv) => {
    if (argv[1] === "drop") return { code: 0, out: [], err: [] }
    const one = commits[at]
    at += 1
    if (one === undefined) throw new OperationalError("the child would not start")
    return { code: 0, out: [`committed as ${one}`], err: [] }
  }
}

test("a call naming no change is refused", async () => {
  const said = await changeRepeat([], givenAt("/nowhere"), piping(ASKED))

  expect(said.code).toBe(1)
  expect(said.refusals[0] ?? "").toContain("<change>")
  expect(said.refusals[0] ?? "").toContain("nothing said it")
  expect(said.refusals.at(-1) ?? "").toContain("one change over and over")
})

test("a call naming two changes is refused rather than repeating the first", async () => {
  const said = await changeRepeat(["wide", "narrow"], givenAt("/nowhere"), piping(ASKED))

  expect(said.code).toBe(1)
  expect(said.refusals[0] ?? "").toContain("takes 1 word")
})

test("a call piping nothing in is refused", async () => {
  const said = await changeRepeat(["wide"], givenAt("/nowhere"), NOTHING)

  expect(said.refusals[0] ?? "").toContain("piped nothing in")
})

test("a call handed no ceiling is refused", async () => {
  const said = await changeRepeat(["wide"], givenAt("/nowhere"), piping("page-type: module\n"))

  expect(said.refusals[0] ?? "").toContain("`at-most` says how many pages one batch acts on")
})

test("a ceiling that is no whole number above nothing is refused", async () => {
  const said = await changeRepeat(["wide"], givenAt("/nowhere"), piping("at-most: none\n"))

  expect(said.refusals[0] ?? "").toContain("is no count of pages")
})

test("each batch is named as soon as that batch has committed", () => {
  const done: string[] = []

  expect(() => repeating(throwingAfter(["aaa", "bbb"]), "wide", ASKED, done)).toThrow()
  expect(done).toEqual(["batch 1 committed as aaa", "batch 2 committed as bbb"])
})

test("a repeat that threw part way names in its refusal each batch it had landed", async () => {
  const held = await answering((done) => repeating(throwingAfter(["aaa"]), "wide", ASKED, done))

  expect(held.report).toEqual(["batch 1 committed as aaa"])
  const last = held.refusals[held.refusals.length - 1] as string
  expect(last).toContain("batch 1 committed as aaa")
})

test("a repeat that threw before a batch landed names no batch", async () => {
  const held = await answering((done) => repeating(throwingAfter([]), "wide", ASKED, done))

  expect(held.report).toEqual([])
  expect(held.refusals.some((one) => one.includes("stopped part way"))).toBe(false)
})

test("whether a change takes a ceiling is read off that change's page", () => {
  const root = indexedRepo(HELD)

  expect(takesAtMost(root, "wide")).toBe(true)
  expect(takesAtMost(root, "narrow")).toBe(false)
  expect(takesAtMost(root, "nowhere")).toBeNull()
})

test("a change whose page states no ceiling is refused", async () => {
  const said = await changeRepeat(["narrow"], givenAt(indexedRepo(HELD)), piping(ASKED), () =>
    landing([])
  )

  expect(said.refusals[0] ?? "").toContain("states no `takes-at-most`")
})

test("the file a child runs is read from the index", () => {
  expect(cliAt(indexedRepo(HELD))).toBe(CLI_CODE)
})

test("every batch is handed the arguments the call was piped, unchanged", async () => {
  const reached: string[][] = []

  const said = await changeRepeat(["wide"], givenAt(indexedRepo(HELD)), piping(ASKED), () =>
    landing(["aaa"], reached)
  )

  expect(said.code).toBe(0)
  expect(reached[0]).toEqual(["change", "apply", "wide", ASKED])
  expect(reached[1]).toEqual(["change", "apply", "wide", ASKED])
})

test("the edits a refused batch left are dropped", () => {
  const reached: string[][] = []

  repeating(landing(["aaa"], reached), "wide", ASKED)

  expect(reached.at(-1)).toEqual([...DROPS, "all: true\n"])
})

test("a drop that refused is said with what ended the run", () => {
  const running: Running = (argv) =>
    argv[1] === "drop"
      ? { code: 1, out: [], err: ["the lock is held"] }
      : { code: 1, out: [], err: [NOTHING_LEFT] }

  const said = repeating(running, "wide", ASKED)

  expect(said.refusals).toEqual([
    NOTHING_LEFT,
    "the edits that batch left were not dropped, so no later run may land:",
    "the lock is held",
  ])
})

test("a batch that landed a commit is followed by another batch", () => {
  const said = repeating(landing(["aaa", "bbb"]), "wide", ASKED)

  expect(said.code).toBe(0)
  expect(said.report[0]).toBe("batch 1 committed as aaa")
  expect(said.report[1]).toBe("batch 2 committed as bbb")
})

test("what the batch ending the run said is the last the report says", () => {
  const said = repeating(landing(["aaa"]), "wide", ASKED)

  expect(said.report).toContain("1 batch(es) landed, and then:")
  expect(said.report.at(-1)).toBe(NOTHING_LEFT)
})

test("a run whose first batch landed nothing is refused", () => {
  const said = repeating(landing([]), "wide", ASKED)

  expect(said.code).toBe(1)
  expect(said.report).toEqual([])
  expect(said.refusals).toEqual([NOTHING_LEFT])
})

test("no line a batch printed of what it wrote is carried into the report", () => {
  const said = repeating(landing(["aaa"]), "wide", ASKED)

  expect(said.report.join(" ")).not.toContain("landed a/b.ts")
})

test("a batch exiting well with no commit ends the run", () => {
  const running: Running = () => ({ code: 0, out: ["nothing was folded in"], err: [] })

  const said = repeating(running, "wide", ASKED)

  expect(said.code).toBe(1)
  expect(said.refusals).toEqual(["nothing was folded in"])
})

test("the commit a batch landed is read off the line naming it", () => {
  expect(committedIn(["landed a/b.ts", "committed as aaa"])).toBe("aaa")
  expect(committedIn(["landed a/b.ts"])).toBeNull()
})

test("what a batch wrote is read as lines with no empty line at the end", () => {
  expect(lined("one\ntwo\n\n")).toEqual(["one", "two"])
  expect(lined("")).toEqual([])
  expect(lined(null)).toEqual([])
})

test("a batch saying nothing at all is said to have landed nothing", () => {
  expect(saidBy({ code: 1, out: [], err: [] })).toEqual([
    "that batch landed nothing and said nothing",
  ])
  expect(saidBy({ code: 1, out: ["said"], err: [] })).toEqual(["said"])
  expect(saidBy({ code: 1, out: ["said"], err: ["why"] })).toEqual(["why"])
})
