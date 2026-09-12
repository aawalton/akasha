import { afterAll, expect, test } from "bun:test"
import { mkdirSync, symlinkSync } from "node:fs"
import { linkFor, linksAt } from "akasha/agents/hooks/links/hook-links.module.code.ts"
import type { FileChange } from "akasha/changes/modules/answer/change-answer.module.types.ts"
import {
  appendEdits,
  editsIn,
  foldedIn,
} from "akasha/changes/modules/edits-keeping/edits-keeping.module.code.ts"
import {
  type Folded,
  folding,
  mendedInto,
  runningOver,
  undone,
} from "akasha/commands/modules/apply-running/apply-running.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import {
  type Landing,
  landingFrom,
} from "akasha/commands/modules/edits-landing/edits-landing.module.code.ts"
import { baseOf } from "akasha/commands/modules/landing-change-composing/landing-change-composing.module.code.ts"
import { said as gitSaid } from "akasha/git/running/git-running.module.code.ts"
import { AKASHA, rootEnvName } from "akasha/pages/checkout-roots/checkout-roots.module.code.ts"
import {
  listedFiled,
  valueAlsoFiled,
} from "akasha/pages/indexes/filing/index-filing.module.code.ts"
import { nothingFiled } from "akasha/pages/indexes/reading/index-reading.module.test-fixtures.ts"
import { scratchWorld } from "akasha/utils/fs/scratching/scratching.module.code.ts"
import { writing as putting } from "akasha/utils/fs/scratching/scratching.module.test-fixtures.ts"

const PAGE = "akasha/seat-system/seats/pages/tester.seat.ts"

const ONE = "akasha/one.page.ts"

const TWO = "akasha/two.page.ts"

const RUNNER = "change-runner"

const MAPPED_SLUG = "mapped"

const MAPPED_PAGE = `akasha/${MAPPED_SLUG}.${RUNNER}.ts`

const MAPPED_ID = "01a081cd-0cb7-7579-9073-ed4e5aa98bf0"

const MAPPED = `akasha/${MAPPED_SLUG}.${RUNNER}.addressed.ts`

const ORPHAN = `akasha/orphan.${RUNNER}.addressed.ts`

const WAS = "a\nb\nc\n"

const NOW = "a\nB\nc\n"

const NOTES = "akasha/notes.txt"

const THREE = "a\nb\nc\n"

const MINE = "a\nB\nc\n"

const FOUR = "a\nb\nc\nd\n"

const BOTH = "a\nB\nc\nd\n"

const WHO = ["-c", "user.email=t@t", "-c", "user.name=t", "-c", "commit.gpgsign=false"]

const scratch = scratchWorld()

afterAll(() => {
  scratch.sweep()
})

function replacing(path: string, contentFrom: string, contentTo: string): FileChange {
  return { kind: "replace", path, contentFrom, contentTo }
}

function removing(path: string): FileChange {
  return { kind: "remove", path }
}

function replayedOnto(
  root: string,
  rows: readonly FileChange[]
): Landing | { readonly why: string } {
  const said = foldedIn(rows)
  if (said.refused !== null) return { why: said.refused }
  return landingFrom(root, baseOf(root), said)
}

function bodyOf(rows: readonly FileChange[], path: string): string {
  const row = rows.find((one) => one.kind === "add" && one.path === path)
  return row !== undefined && row.kind === "add" ? row.content : ""
}

test("a row worked out from an older body is replayed onto the commit at HEAD", async () => {
  const root = await repo()
  await committing(root, NOTES, THREE)
  const rows = [replacing(NOTES, THREE, MINE)]
  await committing(root, NOTES, FOUR)
  const said = replayedOnto(root, rows)
  if ("why" in said) throw new Error(said.why)
  expect(bodyOf(said.rows, NOTES)).toBe(BOTH)
})

test("two rows for one path are replayed as the fold lands them", async () => {
  const root = await repo()
  await committing(root, NOTES, THREE)
  const rows = [replacing(NOTES, THREE, MINE), replacing(NOTES, MINE, BOTH)]
  const said = replayedOnto(root, rows)
  if ("why" in said) throw new Error(said.why)
  expect(bodyOf(said.rows, NOTES)).toBe(BOTH)
})

test("a row worked out from the body at HEAD is replayed as that row states", async () => {
  const root = await repo()
  await committing(root, NOTES, FOUR)
  const rows = [replacing(NOTES, FOUR, MINE)]
  const said = replayedOnto(root, rows)
  if ("why" in said) throw new Error(said.why)
  expect(bodyOf(said.rows, NOTES)).toBe(MINE)
})

test("a row whose passage the commit at HEAD holds nowhere refuses the replay", async () => {
  const root = await repo()
  await committing(root, NOTES, THREE)
  const rows = [replacing(NOTES, THREE, MINE), replacing(NOTES, "z\n", BOTH)]

  const said = replayedOnto(root, rows)

  expect("why" in said).toBe(true)
})

async function committing(root: string, path: string, body: string): Promise<undefined> {
  await putting(root, path, body)
  gitSaid(root, ["add", "--", path])
  gitSaid(root, [...WHO, "commit", "-q", "-m", path, "--", path])
}

async function repo(): Promise<string> {
  const root = scratch.rootFor("akasha-apply-")
  gitSaid(root, ["init", "-q", "-b", "main", "."])
  await putting(root, ONE, WAS)
  gitSaid(root, ["add", "--", ONE])
  gitSaid(root, [...WHO, "commit", "-q", "-m", "base", "--", ONE])
  nothingFiled(root)
  listedFiled(root, RUNNER, MAPPED_SLUG, [{ path: MAPPED_PAGE, id: MAPPED_ID }])
  valueAlsoFiled(root, RUNNER, [
    { path: MAPPED_PAGE, value: { id: MAPPED_ID, pageTypeSlug: RUNNER, slug: MAPPED_SLUG } },
  ])
  return root
}

function foldOf(said: Folded): unknown {
  if ("refusals" in said) return said
  return { folded: said.folded, dropped: said.dropped, unfold: said.unfold }
}

function landing(said: Folded): string {
  if (!("carried" in said) || said.carried === null) throw new Error("the fold carried nothing")
  return bodyOf(said.carried.rows, NOTES)
}

test("a run that stops between the fold and the landing keeps the edits", async () => {
  const root = await repo()
  const row = removing(ONE)
  appendEdits(root, PAGE, [row])

  folding(root, PAGE)

  expect(editsIn(root, PAGE)).toEqual({ rows: [row] })
})

test("the fold hands the landing the body the replay the checks judged left", async () => {
  const root = await repo()
  await committing(root, NOTES, THREE)
  const row = replacing(NOTES, THREE, MINE)
  appendEdits(root, PAGE, [row])
  await committing(root, NOTES, FOUR)
  const judged = replayedOnto(root, [row])
  if ("why" in judged) throw new Error(judged.why)

  const said = landing(folding(root, PAGE))

  expect(said).toBe(BOTH)
  expect(said).toBe(bodyOf(judged.rows, NOTES))
})

test("a fold over a row nothing moved under hands the body that row states", async () => {
  const root = await repo()
  await committing(root, NOTES, THREE)
  const row = replacing(NOTES, THREE, MINE)
  appendEdits(root, PAGE, [row])

  expect(landing(folding(root, PAGE))).toBe(MINE)
})

test("a row appended while the apply ran is left where the folded rows go", async () => {
  const root = await repo()
  const row = removing(ONE)
  appendEdits(root, PAGE, [row])
  const said = folding(root, PAGE)
  if (!("unfold" in said) || said.unfold === null) throw new Error("the fold answered no unfold")
  const later: FileChange = { kind: "add", path: TWO, content: NOW }
  appendEdits(root, PAGE, [later])

  expect(undone(root, PAGE, said.unfold, true)).toBe(null)

  expect(editsIn(root, PAGE)).toEqual({ rows: [later] })
})

test("a row for a body written again on every apply is dropped and named", async () => {
  const root = await repo()
  appendEdits(root, PAGE, [replacing(MAPPED, WAS, NOW)])

  expect(foldOf(folding(root, PAGE))).toEqual({ folded: [], dropped: [MAPPED], unfold: null })

  expect(editsIn(root, PAGE)).toEqual({ rows: [] })
})

test("a row written again on every apply is dropped where another row folds", async () => {
  const root = await repo()
  appendEdits(root, PAGE, [replacing(ONE, WAS, NOW), replacing(MAPPED, WAS, NOW)])

  const said = folding(root, PAGE)

  expect("folded" in said ? said.dropped : []).toEqual([MAPPED])
  expect("folded" in said ? said.folded : []).toEqual([ONE])
})

test("a row for a map no runner page claims folds like any other row", async () => {
  const root = await repo()
  await committing(root, ORPHAN, WAS)
  appendEdits(root, PAGE, [replacing(ORPHAN, WAS, NOW)])

  const said = folding(root, PAGE)

  expect("folded" in said ? said.dropped : []).toEqual([])
  expect("folded" in said ? said.folded : []).toEqual([ORPHAN])
})

test("a fold the apply landed is left where the apply left it", async () => {
  const root = await repo()
  const row = removing(ONE)
  appendEdits(root, PAGE, [row])
  const said = folding(root, PAGE)
  if (!("unfold" in said) || said.unfold === null) throw new Error("the fold answered no unfold")

  expect(undone(root, PAGE, said.unfold, true)).toBe(null)

  expect(editsIn(root, PAGE)).toEqual({ rows: [] })
})

test("a fold the apply did not land leaves the rows", async () => {
  const root = await repo()
  const row = replacing(ONE, WAS, NOW)
  appendEdits(root, PAGE, [row])
  const said = folding(root, PAGE)
  if (!("unfold" in said) || said.unfold === null) throw new Error("the fold answered no unfold")

  expect(undone(root, PAGE, said.unfold, false)).not.toBe(null)

  expect(editsIn(root, PAGE)).toEqual({ rows: [row] })
})

test("two rows for one path the later did not follow refuse the apply and leave the rows", async () => {
  const root = await repo()
  appendEdits(root, PAGE, [replacing(ONE, WAS, NOW), replacing(ONE, "z\n", NOW)])

  const said = folding(root, PAGE)

  expect("refusals" in said).toBe(true)
  expect("why" in editsIn(root, PAGE) ? [] : editsIn(root, PAGE)).not.toEqual({ rows: [] })
})

test("a fold whose every row says the writer owes no reading owes none", () => {
  const rows: readonly FileChange[] = [{ kind: "remove", path: ONE, writerOwesReading: false }]

  expect(runningOver(rows).writerOwesReading).toBe(false)
})

test("the writer owes a reading where any row a fold holds says the writer owes one", () => {
  const rows: readonly FileChange[] = [
    { kind: "remove", path: ONE, writerOwesReading: false },
    { kind: "remove", path: TWO },
  ]

  expect(runningOver(rows).writerOwesReading).toBe(true)
})

test("the fold hands the landing the running its rows state", async () => {
  const root = await repo()
  const row: FileChange = {
    kind: "replace",
    path: ONE,
    contentFrom: WAS,
    contentTo: NOW,
    writerOwesReading: false,
  }
  appendEdits(root, PAGE, [row])

  const said = folding(root, PAGE)

  expect("carried" in said ? said.carried?.running : null).toEqual({
    checks: true,
    writerOwesReading: false,
    readersOweReading: true,
  })
})

test("a path that is no page keeps no edits", async () => {
  const root = await repo()

  expect(folding(root, "akasha/notes.md")).toEqual({
    refusals: ["a path that is no page keeps no edits"],
  })
})

const HOME = "HOME"

const SERVED = rootEnvName(AKASHA)

const GONE = "/made-up/nothing-is-here.ts"

const LANDED: Answer = { report: ["landed"], refusals: [], code: 0 }

function withEnv<T>(name: string, at: string, run: () => T): T {
  const before = process.env[name]
  process.env[name] = at
  try {
    return run()
  } finally {
    if (before === undefined) delete process.env[name]
    else process.env[name] = before
  }
}

function givenAt(root: string): Given {
  return { root, calledAs: "akasha", from: root, writer: null, agentId: null }
}

test("an apply mends a hook link pointing at a file the landing moved away", () => {
  const root = scratch.rootFor("akasha-apply-")
  withEnv(HOME, scratch.rootFor("akasha-apply-home-"), () => {
    mkdirSync(linksAt(), { recursive: true })
    symlinkSync(GONE, linkFor("PreToolUse"))

    const said = withEnv(SERVED, root, () => mendedInto(LANDED, givenAt(root)))

    expect(said.refusals[0]).toContain("a hook is registered through a link that is gone")
  })
})

test("an apply whose every hook link reaches leaves the answer as the answer was", () => {
  const root = scratch.rootFor("akasha-apply-")
  withEnv(HOME, scratch.rootFor("akasha-apply-home-"), () => {
    expect(withEnv(SERVED, root, () => mendedInto(LANDED, givenAt(root)))).toEqual(LANDED)
  })
})
