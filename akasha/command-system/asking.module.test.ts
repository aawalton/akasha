import { afterAll, expect, test } from "bun:test"
import { existsSync, readFileSync, rmSync } from "node:fs"
import { join } from "node:path"
import { ADMITS_CODE, REFUSES_CODE } from "../testing-system/minting.module.code.ts"
import { committedLine, judgedBy, landingAsked, passedOver } from "./asking.module.code.ts"
import {
  asking,
  BROKEN,
  blocked,
  bodyIn,
  CHECKS_AT,
  checking,
  git,
  givenIn,
  headOf,
  LOOSE,
  put,
  REFORMATTED,
  REFUSES_LOOSE,
  REFUSES_TAKING,
  repoWith,
  repoWithTheFormatter,
  scratch,
  TIDY,
} from "./asking.module.test-fixtures.ts"
import { write } from "./command/write/write.command.code.ts"
import { UNNAMED } from "./landing.module.code.ts"

afterAll(scratch.sweep)

test("a report that could not be built leaves the landing standing, and says so", () => {
  const root = repoWith()
  const was = headOf(root)
  const said = landingAsked(givenIn(root), asking({}))
  expect(said.code).toBe(0)
  expect(said.refusals).toEqual([])
  expect(headOf(root)).not.toBe(was)
  expect(said.report).toContain("wrote akasha/two.ts")
  expect(said.report).toContain(`committed as ${headOf(root)}`)
  expect(said.report.join("\n")).toContain(
    "the report could not be built — a report that could not be built"
  )
})

test("a report that could not be built over a removal leaves the removal standing", () => {
  const root = repoWith({ "akasha/one.ts": "committed\n", "akasha/two.ts": "committed\n" })
  const was = headOf(root)
  const said = landingAsked(
    givenIn(root),
    asking({ changes: [{ path: "akasha/two.ts", body: null }] })
  )
  expect(said.code).toBe(0)
  expect(headOf(root)).not.toBe(was)
  expect(said.report).toContain("took away akasha/two.ts")
  expect(existsSync(join(root, "akasha/two.ts"))).toBe(false)
})

test("a report that could not be built over a broken glass leaves the stamp on the commit", () => {
  const root = repoWith()
  checking(root, "refuses", REFUSES_CODE)
  const said = landingAsked(givenIn(root), asking({ glass: "the checks are themselves broken" }))
  expect(said.code).toBe(0)
  expect(said.report).toContain(`committed as ${headOf(root)}`)
  expect(git(root, ["log", "-1", "--pretty=%B"])).toContain(
    "Checks-bypassed: the checks are themselves broken"
  )
})

test("a landing that threw before its commit is operational rather than unclassified", () => {
  const root = repoWith()
  const was = headOf(root)
  const said = landingAsked(givenIn(root), blocked(root))
  expect(said.code).toBe(3)
  expect(said.report).toEqual([])
  expect(said.refusals.join("\n")).toContain("nothing was committed")
  expect(said.refusals.join("\n")).toContain("akasha/three.ts")
  expect(headOf(root)).toBe(was)
})

test("a landing that threw before its commit puts back what it wrote", () => {
  const root = repoWith()
  const said = landingAsked(givenIn(root), blocked(root))
  expect(said.refusals.join("\n")).toContain("what was written was put back")
  expect(existsSync(join(root, "akasha/two.ts"))).toBe(false)
  expect(git(root, ["ls-tree", "--name-only", "HEAD", "akasha/two.ts"]).trim()).toBe("")
})

test("a commit that could not be named is said to stand rather than said to be nothing", () => {
  const held = { base: "held", wrote: ["akasha/two.ts"], took: [], noted: [] }
  expect(committedLine({ ...held, commit: UNNAMED })).toBe(
    "committed — the commit could not be named"
  )
  expect(committedLine({ ...held, commit: "c0ffee" })).toBe("committed as c0ffee")
  expect(committedLine({ ...held, commit: null })).toBe(
    "nothing was committed — what was asked for already stands"
  )
})

test("a dry run gates and writes nothing at all, index entry included", () => {
  const root = repoWith()
  const was = headOf(root)
  const from = put(root, "body.txt", 'import { one } from "./one.ts"\n')
  const said = write(
    ["--file-path", "akasha/two.ts", "--content-file", from, "--dry-run"],
    givenIn(root)
  )
  expect(said.code).toBe(0)
  expect(said.report.join("\n")).toContain("nothing was written")
  expect(existsSync(join(root, "akasha/two.ts"))).toBe(false)
  expect(headOf(root)).toBe(was)
  expect(git(root, ["status", "--porcelain", "--", "akasha"]).trim()).toBe("")
  expect(existsSync(join(root, ".git/data/index/import"))).toBe(false)
})

test("a dry run over a change the checks refuse reports the refusal", () => {
  const root = repoWith()
  checking(root, "refuses", REFUSES_CODE)
  const from = bodyIn(root)
  const said = write(
    ["--file-path", "akasha/two.ts", "--content-file", from, "--dry-run"],
    givenIn(root)
  )
  expect(said.code).toBe(3)
  expect(said.refusals.join("\n")).toContain("refused for the test")
  expect(existsSync(join(root, "akasha/two.ts"))).toBe(false)
})

test("a check is handed a removal, and can refuse it", () => {
  const root = repoWith({ "akasha/one.ts": "committed\n", "akasha/two.ts": "committed\n" })
  checking(root, "refuses-taking", REFUSES_TAKING)
  const said = write(["--remove", "akasha/two.ts", "--dry-run"], givenIn(root))
  expect(said.code).toBe(3)
  expect(said.refusals.join("\n")).toContain("akasha/two.ts — a check judged this going away")
})

test("that same check lets a written body through, so it refuses the going and not the arriving", () => {
  const root = repoWith()
  checking(root, "refuses-taking", REFUSES_TAKING)
  const from = bodyIn(root)
  const said = write(
    ["--file-path", "akasha/two.ts", "--content-file", from, "--dry-run"],
    givenIn(root)
  )
  expect(said.refusals).toEqual([])
  expect(said.code).toBe(0)
})

test("a gate counts the removal it judged beside the body it wrote, so a move is not doubled", () => {
  const root = repoWith({ "akasha/one.ts": "committed\n", "akasha/two.ts": "committed\n" })
  checking(root, "admits", ADMITS_CODE)
  const from = bodyIn(root)
  const said = write(
    [
      "--file-path",
      "akasha/three.ts",
      "--content-file",
      from,
      "--remove",
      "akasha/two.ts",
      "--dry-run",
    ],
    givenIn(root)
  )
  expect(said.code).toBe(0)
  expect(said.report[0]).toBe("1 check passed over the 2 paths asked for")
})

test("a pass names how many checks ran and how many paths they were handed", () => {
  expect(passedOver(1, 1)).toBe("1 check passed over the 1 path asked for")
  expect(passedOver(12, 6)).toBe("12 checks passed over the 6 paths asked for")
  expect(passedOver(0, 2)).toBe(
    "no check runs at this phase, so the 2 paths asked for went unjudged"
  )
})

test("a landing names what judged it, and says so when nothing did", () => {
  expect(judgedBy(1, 1)).toBe("1 check judged the 1 path asked for, and none refused")
  expect(judgedBy(0, 1)).toBe(
    "no check runs at this phase, so the 1 path asked for landed unjudged"
  )
})

test("a landing whose phase runs no check says the paths landed unjudged", () => {
  const root = repoWith()
  rmSync(join(root, CHECKS_AT, "admits.jsonl"))
  checking(root, "later", ADMITS_CODE, "deploy")
  const from = bodyIn(root)
  const said = write(
    ["--file-path", "akasha/two.ts", "--content-file", from, "--message", "held"],
    givenIn(root)
  )
  expect(said.code).toBe(0)
  expect(said.report).toContain(
    "no check runs at this phase, so the 1 path asked for landed unjudged"
  )
})

test("breaking the glass runs no check and says so in the commit", () => {
  const root = repoWith()
  checking(root, "refuses", REFUSES_CODE)
  const from = bodyIn(root)
  const said = write(
    [
      "--file-path",
      "akasha/two.ts",
      "--content-file",
      from,
      "--message",
      "held",
      "--break-the-glass",
      "the checks are themselves broken",
    ],
    givenIn(root)
  )
  expect(said.code).toBe(0)
  expect(readFileSync(join(root, "akasha/two.ts"), "utf8")).toBe("proposed\n")
  expect(git(root, ["log", "-1", "--pretty=%B"])).toContain(
    "Checks-bypassed: the checks are themselves broken"
  )
})

test("a dry run that breaks the glass is refused, having nothing to report", () => {
  const root = repoWith()
  const from = bodyIn(root)
  const said = write(
    [
      "--file-path",
      "akasha/two.ts",
      "--content-file",
      from,
      "--dry-run",
      "--break-the-glass",
      "why",
    ],
    givenIn(root)
  )
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("report nothing")
})

test("a loose body lands formatted and sorted, and the report says it did", () => {
  const root = repoWithTheFormatter()
  const from = put(root, "body.txt", LOOSE)
  const said = write(
    ["--file-path", "akasha/two.ts", "--content-file", from, "--message", "held"],
    givenIn(root)
  )
  expect(said.refusals).toEqual([])
  expect(said.code).toBe(0)
  expect(readFileSync(join(root, "akasha/two.ts"), "utf8")).toBe(TIDY)
  expect(git(root, ["show", "HEAD:akasha/two.ts"])).toBe(TIDY)
  expect(said.report).toContain(REFORMATTED)
})

test("a body that will not parse lands whole rather than blank", () => {
  const root = repoWithTheFormatter()
  const from = put(root, "body.txt", BROKEN)
  const said = write(
    ["--file-path", "akasha/two.ts", "--content-file", from, "--message", "held"],
    givenIn(root)
  )
  expect(said.code).toBe(0)
  expect(readFileSync(join(root, "akasha/two.ts"), "utf8")).toBe(BROKEN)
  expect(said.report).not.toContain(REFORMATTED)
})

test("a body already formatted lands untouched, and the report says nothing extra", () => {
  const root = repoWithTheFormatter()
  const from = put(root, "body.txt", TIDY)
  const said = write(
    ["--file-path", "akasha/two.ts", "--content-file", from, "--message", "held"],
    givenIn(root)
  )
  expect(said.code).toBe(0)
  expect(readFileSync(join(root, "akasha/two.ts"), "utf8")).toBe(TIDY)
  expect(said.report).not.toContain(REFORMATTED)
})

test("a removal is carried through the formatter untouched, and nothing is said of it", () => {
  const root = repoWithTheFormatter({
    "akasha/one.ts": "committed\n",
    "akasha/two.ts": "committed\n",
  })
  const said = write(["--remove", "akasha/two.ts", "--message", "held"], givenIn(root))
  expect(said.code).toBe(0)
  expect(said.report).toContain("took away akasha/two.ts")
  expect(said.report).not.toContain(REFORMATTED)
  expect(existsSync(join(root, "akasha/two.ts"))).toBe(false)
})

test("a dry run gates the formatted body, so what a check judged is what would land", () => {
  const root = repoWithTheFormatter()
  checking(root, "refuses-loose", REFUSES_LOOSE)
  const from = put(root, "body.txt", LOOSE)
  const said = write(
    ["--file-path", "akasha/two.ts", "--content-file", from, "--dry-run"],
    givenIn(root)
  )
  expect(said.refusals).toEqual([])
  expect(said.code).toBe(0)
})
