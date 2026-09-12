import { afterAll, expect, test } from "bun:test"
import { writeFileSync } from "node:fs"
import { join } from "node:path"
import {
  auditOne,
  bodyFor,
  carriedOn,
  commitOf,
  keyFor,
  movedIn,
  type Over,
  roundOver,
  turnAt,
  turnedRed,
  verdictOf,
} from "akasha/checks/modules/audit-serving/audit-serving.module.code.ts"
import {
  type Verdict,
  verdictsRead,
  verdictsWrite,
} from "akasha/checks/modules/audit-verdict/audit-verdict.module.code.ts"
import type { Gathered } from "akasha/checks/modules/checking/checking.module.code.ts"
import type { Judged } from "akasha/checks/modules/judging/judging.module.code.ts"
import { runGit } from "akasha/git/answering/git-answering.module.code.ts"
import type { Change } from "akasha/pages/change/change.module.code.ts"
import { shadowAsked } from "akasha/pages/shadow/shadow.module.code.ts"
import { scratchWorld } from "akasha/utils/fs/scratching/scratching.module.code.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

const NOW = "2026-09-11T00:00:00.000Z"

const CLEAN: Verdict = { commit: "a", ranAt: NOW, refusals: [], unrun: false }

const NOTHING: Change = {
  root: "/nowhere",
  changed: [],
  before: () => null,
  after: () => null,
}

function gathered(slug: string, root: string): Gathered {
  return {
    slug,
    page: `checks/code-checks/pages/${slug}/${slug}.code-check.ts`,
    root,
    runsOn: ["audit"],
    isInput: null,
    run: () => [],
  }
}

function taking(slug: string, root: string, ending: string): Gathered {
  return { ...gathered(slug, root), isInput: (path) => path.endsWith(ending) }
}

async function repoOf(commits: number): Promise<{ root: string; made: readonly string[] }> {
  const root = scratch.rootFor("akasha-audit-serving-")
  await runGit(["init", "-q", "-b", "main"], root)
  await runGit(["config", "user.email", "serving@example.com"], root)
  await runGit(["config", "user.name", "serving"], root)
  const made: string[] = []
  for (let at = 0; at < commits; at += 1) {
    writeFileSync(join(root, "one.txt"), `${at}\n`, "utf8")
    await runGit(["add", "one.txt"], root)
    await runGit(["commit", "-q", "-m", `${at}`], root)
    made.push((await runGit(["rev-parse", "HEAD"], root)).stdout)
  }
  return { root, made }
}

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

test("a check turns red only where it was clean or unknown before", () => {
  const red: Verdict = { ...CLEAN, refusals: ["one refused"] }
  expect(turnedRed(undefined, red)).toBe(true)
  expect(turnedRed(CLEAN, red)).toBe(true)
  expect(turnedRed(red, red)).toBe(false)
  expect(turnedRed(red, CLEAN)).toBe(false)
  expect(turnedRed(CLEAN, CLEAN)).toBe(false)
})

test("a round runs the checks its phase names and the checks a request names", () => {
  const every: readonly Gathered[] = [
    gathered("typecheck", "/r"),
    { ...gathered("lint-clean", "/r"), runsOn: ["change"] },
    { ...gathered("new-check", "/r"), runsOn: [] },
  ]
  const slugs = (asked: readonly string[]): readonly string[] =>
    roundOver(every, asked).map((one) => one.slug)
  expect(slugs([])).toEqual(["typecheck"])
  expect(slugs(["new-check"])).toEqual(["typecheck", "new-check"])
  expect(slugs(["typecheck"])).toEqual(["typecheck"])
  expect(slugs(["nobody"])).toEqual(["typecheck"])
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

test("what thea is told names every check that turned and what each refused", () => {
  const said = bodyFor(
    [{ check: "typecheck", verdict: { ...CLEAN, refusals: ["one.ts — no"] }, ran: true }],
    "abc",
    "/h"
  )
  expect(said).toContain("typecheck")
  expect(said).toContain("one.ts — no")
  expect(said).toContain("abc")
  expect(said).toContain("/h/.local/state/workstation-services/audit-verdicts.json")
})

test("a refusal too long for a message is shortened to say how much of it went", () => {
  const whole = `68 test files failed:\n${"a/b.test.ts\n".repeat(400)}`
  const said = bodyFor(
    [{ check: "tests-pass", verdict: { ...CLEAN, refusals: [whole] }, ran: true }],
    "abc",
    "/h"
  )
  expect(said).toContain("68 test files failed:")
  expect(said).toContain("lines more)")
  expect(said.length).toBeLessThan(whole.length)
})

test("a message is held to the words a message page carries", () => {
  const refusals = Array.from({ length: 400 }, (_, at) => `akasha/${at}.ts — ${"no ".repeat(90)}`)
  const red = refusals.map((one, at) => ({
    check: `check-${at}`,
    verdict: { ...CLEAN, refusals: [one] },
    ran: true,
  }))
  const said = bodyFor(red, "abc", "/h")
  expect(new TextEncoder().encode(said).length).toBeLessThan(20000)
  expect(said).toContain("audit-verdicts.json")
})

test("a check with no verdict yet is run, and the verdict is kept", async () => {
  const { root, made } = await repoOf(1)
  const home = scratch.rootFor("akasha-audit-serving-home-")
  const over: Over = { change: NOTHING, commit: made[0] ?? "" }
  const ran = await auditOne({
    root,
    home,
    check: gathered("typecheck", root),
    over,
    asked: over.commit,
    run: async () => [],
  })
  expect(ran.ran).toBe(true)
  expect(ran.verdict.commit).toBe(over.commit)
  expect(verdictsRead(home).typecheck?.refusals).toEqual([])
})

test("an asker whose check is clean at the asker's commit starts no run", async () => {
  const { root, made } = await repoOf(2)
  const home = scratch.rootFor("akasha-audit-serving-home-")
  verdictsWrite(home, { typecheck: { ...CLEAN, commit: made[1] ?? "" } })
  const ran = await auditOne({
    root,
    home,
    check: gathered("typecheck", root),
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
  const home = scratch.rootFor("akasha-audit-serving-home-")
  verdictsWrite(home, { typecheck: { ...CLEAN, commit: made[0] ?? "" } })
  const ran = await auditOne({
    root,
    home,
    check: gathered("typecheck", root),
    over: { change: NOTHING, commit: made[1] ?? "" },
    asked: made[1] ?? "",
    run: async () => [{ path: "one.ts", reason: "one refused" }],
  })
  expect(ran.ran).toBe(true)
  expect(ran.verdict.refusals).toEqual(["one.ts — one refused"])
})

test("many askers at one commit are answered by one run", async () => {
  const { root, made } = await repoOf(1)
  const home = scratch.rootFor("akasha-audit-serving-home-")
  let runs = 0
  const asking = {
    root,
    home,
    check: gathered("typecheck", root),
    over: { change: NOTHING, commit: made[0] ?? "" },
    asked: made[0] ?? "",
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
