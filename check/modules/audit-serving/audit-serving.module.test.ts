import { afterAll, expect, test } from "bun:test"
import { existsSync } from "node:fs"
import {
  aloneOver,
  auditOne,
  carriedOn,
  childAt,
  commitOf,
  judgedIn,
  keyFor,
  movedIn,
  type Over,
  type Ran,
  roundOver,
  spawning,
  turnAt,
  verdictOf,
} from "akasha/check/modules/audit-serving/audit-serving.module.code.ts"
import {
  CLEAN,
  carrying,
  checked,
  cleanKept,
  gathered,
  into,
  LOGS,
  NOTHING,
  NOW,
  repoOf,
  scratch,
  taking,
} from "akasha/check/modules/audit-serving/audit-serving.module.test-fixtures.ts"
import { verdictLogged } from "akasha/check/modules/audit-verdict/audit-verdict.module.code.ts"
import type { Gathered } from "akasha/check/modules/checking/checking.module.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"
import { shadowAsked } from "akasha/page/modules/shadow/shadow.module.code.ts"

afterAll(scratch.sweep)

test("the commit a run answers for is the commit the repository is at", async () => {
  const { root, made } = await repoOf(2)
  expect(await commitOf(root)).toBe(made[1] ?? "")
})

test("a verdict carries the refusals whole and says whether the check ran", () => {
  const found: readonly Judged[] = [
    { path: "one.ts", reason: "one refused" },
    { path: "two.ts", reason: "two threw", threw: true },
  ]
  expect(verdictOf(found, { change: NOTHING, commit: "abc" }, NOW)).toEqual({
    commit: "abc",
    ranAt: NOW,
    refusals: ["one.ts — one refused", "two.ts — two threw"],
    unrun: true,
  })
})

test("a run that refused nothing leaves a clean verdict", () => {
  expect(verdictOf([], { change: NOTHING, commit: "abc" }, NOW)).toEqual({
    commit: "abc",
    ranAt: NOW,
    refusals: [],
    unrun: false,
  })
})

test("a round a request names checks for runs those checks alone", () => {
  const every: readonly Gathered[] = [
    gathered("typecheck", "/r"),
    { ...gathered("lint-clean", "/r"), runsOn: ["change"] },
    { ...gathered("new-check", "/r"), runsOn: [] },
  ]
  const slugs = (asked: readonly string[]): readonly string[] =>
    roundOver(every, asked).map((one) => one.slug)
  expect(slugs([])).toEqual(["typecheck"])
  expect(slugs(["new-check"])).toEqual(["new-check"])
  expect(slugs(["typecheck"])).toEqual(["typecheck"])
  expect(slugs(["lint-clean", "new-check"])).toEqual(["lint-clean", "new-check"])
  expect(slugs(["nobody"])).toEqual([])
})

test("the file one check's audit runs from is asked of the index", () => {
  expect(existsSync(childAt(process.cwd()))).toBe(true)
})

test("a verdict the child could not have written is read as no verdict", () => {
  expect(judgedIn("not json at all")).toBeNull()
  expect(judgedIn('{"path":"one.ts","reason":"no"}')).toBeNull()
  expect(judgedIn('[{"path":"one.ts"}]')).toBeNull()
  expect(judgedIn("[null]")).toBeNull()
})

test("a verdict the child wrote is read back whole", () => {
  expect(judgedIn("[]")).toEqual([])
  expect(judgedIn('[{"path":"one.ts","reason":"no","threw":true}]')).toEqual([
    { path: "one.ts", reason: "no", threw: true },
  ])
})

test("a check whose process could not be started could not run", async () => {
  const root = scratch.rootFor("akasha-audit-apart-")
  const found = await spawning(gathered("typecheck", root), NOTHING)
  expect(found.length).toBe(1)
  expect(found[0]?.threw).toBe(true)
  expect(found[0]?.reason).toContain("typecheck")
})

test("a turn is a path of its own for each check", () => {
  expect(turnAt("/home/one", "typecheck")).not.toBe(turnAt("/home/one", "lint-clean"))
})

test("two askers join one run only where check, home and commit all agree", () => {
  const over: Over = { change: NOTHING, commit: "abc" }
  const later: Over = { change: NOTHING, commit: "def" }
  const one = { root: "/r", home: "/h", check: gathered("typecheck", "/r"), over, asked: "abc" }
  expect(keyFor(one)).toBe(keyFor({ ...one, asked: "zzz" }))
  expect(keyFor(one)).not.toBe(keyFor({ ...one, over: later }))
  expect(keyFor(one)).not.toBe(keyFor({ ...one, check: gathered("lint-clean", "/r") }))
  expect(keyFor(one)).not.toBe(keyFor({ ...one, home: "/other" }))
})

test("a check with no verdict yet is run, and the verdict is kept", async () => {
  const { root, made } = await repoOf(1)
  const one = checked("typecheck", root)
  const over: Over = { change: NOTHING, commit: made[0] ?? "" }
  const ran = await auditOne({
    root,
    home: scratch.rootFor("akasha-audit-serving-home-"),
    check: one,
    over,
    asked: over.commit,
    record: into(root),
    run: async () => [],
  })
  expect(ran.ran).toBe(true)
  expect(ran.verdict.commit).toBe(over.commit)
  expect(verdictLogged(root, one.page, LOGS)?.commit).toBe(over.commit)
  expect(verdictLogged(root, one.page, LOGS)?.refusals).toEqual([])
})

test("an asker whose check is clean at the asker's commit starts no run", async () => {
  const { root, made } = await repoOf(2)
  const one = checked("typecheck", root)
  await cleanKept(root, one, made[1] ?? "")
  const ran = await auditOne({
    root,
    home: scratch.rootFor("akasha-audit-serving-home-"),
    check: one,
    over: { change: NOTHING, commit: made[1] ?? "" },
    asked: made[0] ?? "",
    run: async () => {
      throw new Error("this check was run for an asker a verdict already answered")
    },
  })
  expect(ran.ran).toBe(false)
})

test("an asker at a commit after the verdict is run again", async () => {
  const { root, made } = await repoOf(2)
  const one = checked("typecheck", root)
  await cleanKept(root, one, made[0] ?? "")
  const ran = await auditOne({
    root,
    home: scratch.rootFor("akasha-audit-serving-home-"),
    check: one,
    over: { change: NOTHING, commit: made[1] ?? "" },
    asked: made[1] ?? "",
    record: into(root),
    run: async () => [{ path: "one.ts", reason: "one refused" }],
  })
  expect(ran.ran).toBe(true)
  expect(ran.verdict.refusals).toEqual(["one.ts — one refused"])
  expect(verdictLogged(root, one.page, LOGS)?.refusals).toEqual(["one.ts — one refused"])
})

test("a check whose input never moved is carried onto the newer commit in its log", async () => {
  const { root, made } = await repoOf(2)
  const one = { ...checked("shell-clean", root), isInput: (path: string) => path.endsWith(".sh") }
  await cleanKept(root, one, made[0] ?? "")
  const ran = await auditOne({
    root,
    home: scratch.rootFor("akasha-audit-serving-home-"),
    check: one,
    over: { change: NOTHING, commit: made[1] ?? "" },
    asked: made[1] ?? "",
    moved: movedIn(root, made[1] ?? ""),
    shadow: shadowAsked(NOTHING),
    record: into(root),
    run: async () => {
      throw new Error("this check was run where its verdict could be carried")
    },
  })
  expect(ran.ran).toBe(false)
  expect(verdictLogged(root, one.page, LOGS)?.commit).toBe(made[1] ?? "")
})

test("many askers at one commit are answered by one run", async () => {
  const { root, made } = await repoOf(1)
  let runs = 0
  const asking = {
    root,
    home: scratch.rootFor("akasha-audit-serving-home-"),
    check: checked("typecheck", root),
    over: { change: NOTHING, commit: made[0] ?? "" },
    asked: made[0] ?? "",
    record: into(root),
    run: async (): Promise<readonly Judged[]> => {
      runs += 1
      return []
    },
  }
  const [one, two, three] = await Promise.all([
    auditOne(asking),
    auditOne(asking),
    auditOne(asking),
  ])
  expect(runs).toBe(1)
  expect(one.verdict).toEqual(two.verdict)
  expect(two.verdict).toEqual(three.verdict)
})

test("a span of commits is answered by the files git says moved", async () => {
  const { root, made } = await repoOf(2)
  const moved = movedIn(root, made[1] ?? "")
  expect(await moved(made[0] ?? "")).toEqual(["one.txt"])
  expect(await moved(made[1] ?? "")).toEqual([])
})

test("a span git cannot answer is no span", async () => {
  const { root, made } = await repoOf(1)
  const moved = movedIn(root, made[0] ?? "")
  expect(await moved("0000000000000000000000000000000000000000")).toBeNull()
})

test("a check whose input never moved is carried to the newer commit", async () => {
  const { root, made } = await repoOf(2)
  const carried = await carriedOn(
    {
      root,
      home: "/h",
      check: taking("shell-clean", root, ".sh"),
      over: { change: NOTHING, commit: made[1] ?? "" },
      asked: made[1] ?? "",
      moved: movedIn(root, made[1] ?? ""),
      shadow: shadowAsked(NOTHING),
    },
    { ...CLEAN, commit: made[0] ?? "" }
  )
  expect(carried?.commit).toBe(made[1] ?? "")
  expect(carried?.ranAt).toBe(NOW)
})

test("a check whose input moved is run rather than carried", async () => {
  const { root, made } = await repoOf(2)
  const carried = await carriedOn(
    {
      root,
      home: "/h",
      check: taking("no-tmp", root, ".txt"),
      over: { change: NOTHING, commit: made[1] ?? "" },
      asked: made[1] ?? "",
      moved: movedIn(root, made[1] ?? ""),
      shadow: shadowAsked(NOTHING),
    },
    { ...CLEAN, commit: made[0] ?? "" }
  )
  expect(carried).toBeNull()
})

test("a check naming no input is run rather than carried", async () => {
  const { root, made } = await repoOf(2)
  const carried = await carriedOn(
    {
      root,
      home: "/h",
      check: gathered("typecheck", root),
      over: { change: NOTHING, commit: made[1] ?? "" },
      asked: made[1] ?? "",
      moved: movedIn(root, made[1] ?? ""),
      shadow: shadowAsked(NOTHING),
    },
    { ...CLEAN, commit: made[0] ?? "" }
  )
  expect(carried).toBeNull()
})

test("an asker handing over no span carries nothing forward", async () => {
  const { root, made } = await repoOf(2)
  const carried = await carriedOn(
    {
      root,
      home: "/h",
      check: taking("shell-clean", root, ".sh"),
      over: { change: NOTHING, commit: made[1] ?? "" },
      asked: made[1] ?? "",
    },
    { ...CLEAN, commit: made[0] ?? "" }
  )
  expect(carried).toBeNull()
})

test("an unmeasured verdict is run again rather than carried, its input unmoved", async () => {
  const { root, made } = await repoOf(2)
  const before = { ...CLEAN, commit: made[0] ?? "", refusals: ["one.sh — no"], unrun: true }
  expect(await carriedOn(carrying(root, made), before)).toBeNull()
})

test("a verdict that refused is carried forward as a verdict that refuses", async () => {
  const { root, made } = await repoOf(2)
  const carried = await carriedOn(
    {
      root,
      home: "/h",
      check: taking("shell-clean", root, ".sh"),
      over: { change: NOTHING, commit: made[1] ?? "" },
      asked: made[1] ?? "",
      moved: movedIn(root, made[1] ?? ""),
      shadow: shadowAsked(NOTHING),
    },
    { ...CLEAN, commit: made[0] ?? "", refusals: ["one.sh — no"] }
  )
  expect(carried?.refusals).toEqual(["one.sh — no"])
  expect(carried?.commit).toBe(made[1] ?? "")
})

function ranFirst(refusals: readonly string[], unrun: boolean, commit: string): Ran {
  return { check: "typecheck", verdict: { ...CLEAN, commit, refusals, unrun }, ran: true }
}

test("a check refusing over its own page is run again alone and the second verdict is kept", async () => {
  const { root, made } = await repoOf(1)
  const one = checked("typecheck", root)
  const over: Over = { change: NOTHING, commit: made[0] ?? "" }
  let runs = 0
  const said = `${one.page} — the check \`typecheck\` spent 30 over the 15 its page states`
  const again = await aloneOver(
    {
      root,
      home: scratch.rootFor("akasha-audit-serving-home-"),
      checks: [],
      record: into(root),
      run: async (): Promise<readonly Judged[]> => {
        runs += 1
        return []
      },
    },
    over,
    [one],
    [ranFirst([said], false, over.commit)]
  )
  expect(runs).toBe(1)
  expect(again.get(0)?.verdict.refusals).toEqual([])
  expect(verdictLogged(root, one.page, LOGS)?.refusals).toEqual([])
})

test("a check refusing over a path in the tree is run no second time", async () => {
  const { root, made } = await repoOf(1)
  const one = checked("typecheck", root)
  const over: Over = { change: NOTHING, commit: made[0] ?? "" }
  const again = await aloneOver(
    {
      root,
      home: scratch.rootFor("akasha-audit-serving-home-"),
      checks: [],
      record: into(root),
      run: async (): Promise<readonly Judged[]> => {
        throw new Error("a refusal naming the tree was run a second time")
      },
    },
    over,
    [one],
    [ranFirst(["one.ts — one refused"], false, over.commit)]
  )
  expect(again.size).toBe(0)
})

test("a check a signal ended is run again alone, its refusal naming its own page", async () => {
  const { root, made } = await repoOf(1)
  const one = checked("typecheck", root)
  const over: Over = { change: NOTHING, commit: made[0] ?? "" }
  const said = `${one.page} — the check \`typecheck\` died on SIGKILL apart, so it judged nothing`
  const again = await aloneOver(
    {
      root,
      home: scratch.rootFor("akasha-audit-serving-home-"),
      checks: [],
      record: into(root),
      run: async (): Promise<readonly Judged[]> => [],
    },
    over,
    [one],
    [ranFirst([said], true, over.commit)]
  )
  expect(again.get(0)?.verdict.unrun).toBe(false)
  expect(again.get(0)?.verdict.refusals).toEqual([])
})

test("a check carried rather than run is run no second time", async () => {
  const { root, made } = await repoOf(1)
  const one = checked("typecheck", root)
  const over: Over = { change: NOTHING, commit: made[0] ?? "" }
  const first = ranFirst([`${one.page} — over its ceiling`], false, over.commit)
  const again = await aloneOver(
    {
      root,
      home: scratch.rootFor("akasha-audit-serving-home-"),
      checks: [],
      record: into(root),
      run: async (): Promise<readonly Judged[]> => {
        throw new Error("a carried verdict was run a second time")
      },
    },
    over,
    [one],
    [{ ...first, ran: false }]
  )
  expect(again.size).toBe(0)
})
