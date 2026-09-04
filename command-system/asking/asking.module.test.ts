import { afterAll, expect, test } from "bun:test"
import { existsSync, readFileSync } from "node:fs"
import { join } from "node:path"
import { listedTakenFrom } from "@akasha/indexes/testing"
import { ADMITS_CODE, REFUSES_CODE } from "@akasha/testing-system/minting"
import { put } from "@akasha/testing-system/putting"
import { write } from "../commands/write/write.command.code.ts"
import { baseOf as headOf } from "../landing/landing.module.code.ts"
import { landingAsked, MECHANICAL, NO_CHECKS } from "./asking.module.code.ts"
import {
  asking,
  BROKEN,
  blocked,
  bodyIn,
  checking,
  git,
  givenIn,
  LOOSE,
  PROPOSED,
  REFORMATTED,
  REFUSES_LOOSE,
  REFUSES_TAKING,
  repoNoCheckLoads,
  repoWith,
  repoWithTheFormatter,
  scratch,
  TIDY,
  UNLOADABLE_AT,
  wrote,
} from "./asking.module.test-fixtures.ts"

afterAll(scratch.sweep)

test("a report that could not be built leaves the landing standing, and says so", async () => {
  const root = repoWith()
  const was = headOf(root)
  const said = await landingAsked(givenIn(root), asking({}))
  expect(said.code).toBe(0)
  expect(said.refusals).toEqual([])
  expect(headOf(root)).not.toBe(was)
  expect(said.report).toContain("wrote akasha/two.ts")
  expect(said.report).toContain(`committed as ${headOf(root)}`)
  expect(said.report.join("\n")).toContain(
    "the report could not be built — a report that could not be built"
  )
})

test("a report that could not be built over a removal leaves the removal standing", async () => {
  const root = repoWith({ "akasha/one.ts": "committed\n", "akasha/two.ts": "committed\n" })
  const was = headOf(root)
  const said = await landingAsked(
    givenIn(root),
    asking({ changes: [{ path: "akasha/two.ts", body: null }] })
  )
  expect(said.code).toBe(0)
  expect(headOf(root)).not.toBe(was)
  expect(said.report).toContain("took away akasha/two.ts")
  expect(existsSync(join(root, "akasha/two.ts"))).toBe(false)
})

test("a report that could not be built over a broken glass leaves the stamp on the commit", async () => {
  const root = repoWith()
  checking(root, "refuses", REFUSES_CODE)
  const said = await landingAsked(
    givenIn(root),
    asking({ glass: "the checks are themselves broken" })
  )
  expect(said.code).toBe(0)
  expect(said.report).toContain(`committed as ${headOf(root)}`)
  expect(git(root, ["log", "-1", "--pretty=%B"])).toContain(
    "Checks-bypassed: the checks are themselves broken"
  )
})

test("a landing that threw before its commit is operational rather than unclassified", async () => {
  const root = repoWith()
  const was = headOf(root)
  const said = await landingAsked(givenIn(root), blocked(root))
  expect(said.code).toBe(3)
  expect(said.report).toEqual([])
  expect(said.refusals.join("\n")).toContain("nothing was committed")
  expect(said.refusals.join("\n")).toContain("akasha/three.ts")
  expect(headOf(root)).toBe(was)
})

test("a landing that threw before its commit puts back what it wrote", async () => {
  const root = repoWith()
  const said = await landingAsked(givenIn(root), blocked(root))
  expect(said.refusals.join("\n")).toContain("what was written was put back")
  expect(existsSync(join(root, "akasha/two.ts"))).toBe(false)
  expect(git(root, ["ls-tree", "--name-only", "HEAD", "akasha/two.ts"]).trim()).toBe("")
})

test("checks that will not load refuse the change, and nothing reaches the disk", () => {
  const root = repoNoCheckLoads()
  const was = headOf(root)
  const said = wrote(root, ["--message", "held"])
  expect(said.code).toBe(3)
  expect(said.refusals.join("\n")).toContain("the checks could not be loaded from")
  expect(said.refusals.join("\n")).toContain(
    `${UNLOADABLE_AT} is a check's code, and would not load`
  )
  expect(said.refusals.join("\n")).toContain("nothing was judged and nothing was written")
  expect(existsSync(join(root, "akasha/two.ts"))).toBe(false)
  expect(headOf(root)).toBe(was)
})

test("the glass carries a change past checks that will not load, and the commit says why", () => {
  const root = repoNoCheckLoads()
  const said = wrote(root, ["--message", "held", "--break-the-glass", "mid-refactor"])
  expect(said.code).toBe(0)
  expect(said.report).toContain("wrote akasha/two.ts")
  expect(said.report.join("\n")).toContain("either, so none could have run")
  const body = git(root, ["log", "-1", "--pretty=%B"])
  expect(body).toContain("Checks-bypassed: mid-refactor")
  expect(body).toContain(`Checks-unloadable: ${UNLOADABLE_AT} is a check's code`)
})

test("a check is handed a removal, and can refuse it", () => {
  const root = repoWith({ "akasha/one.ts": "committed\n", "akasha/two.ts": "committed\n" })
  checking(root, "refuses-taking", REFUSES_TAKING)
  const was = headOf(root)
  const said = write(["--remove", "akasha/two.ts", "--message", "held"], givenIn(root))
  expect(said.code).toBe(3)
  expect(said.refusals.join("\n")).toContain("akasha/two.ts — a check judged this going away")
  expect(existsSync(join(root, "akasha/two.ts"))).toBe(true)
  expect(headOf(root)).toBe(was)
})

test("that same check lets a written body through, so it refuses the going and not the arriving", () => {
  const root = repoWith()
  checking(root, "refuses-taking", REFUSES_TAKING)
  const said = wrote(root, ["--message", "held"])
  expect(said.refusals).toEqual([])
  expect(said.code).toBe(0)
  expect(readFileSync(join(root, "akasha/two.ts"), "utf8")).toBe(PROPOSED)
})

test("a gate counts the removal it judged beside the body it wrote, so a move is not doubled", () => {
  const root = repoWith({ "akasha/one.ts": "committed\n", "akasha/two.ts": "committed\n" })
  checking(root, "admits", ADMITS_CODE)
  const from = bodyIn(root)
  const said = write(
    ["--file-path", "akasha/three.ts", "--content-file", from, "--remove", "akasha/two.ts"],
    givenIn(root)
  )
  expect(said.code).toBe(0)
  expect(said.report).toContain("1 check judged the 2 paths asked for, and none refused")
})

test("a landing whose phase runs no check says the paths landed unjudged", () => {
  const root = repoWith()
  listedTakenFrom(root, "code-check", "admits")
  checking(root, "later", ADMITS_CODE, "deploy")
  const said = wrote(root, ["--message", "held"])
  expect(said.code).toBe(0)
  expect(said.report).toContain(
    "no check runs at this phase, so the 1 path asked for landed unjudged"
  )
})

test("breaking the glass runs no check and says so in the commit", () => {
  const root = repoWith()
  checking(root, "refuses", REFUSES_CODE)
  const said = wrote(root, [
    "--message",
    "held",
    "--break-the-glass",
    "the checks are themselves broken",
  ])
  expect(said.code).toBe(0)
  expect(readFileSync(join(root, "akasha/two.ts"), "utf8")).toBe(PROPOSED)
  expect(git(root, ["log", "-1", "--pretty=%B"])).toContain(
    "Checks-bypassed: the checks are themselves broken"
  )
})

test("a landing made by a program runs no check and says so in the commit", () => {
  const root = repoWith()
  checking(root, "refuses", REFUSES_CODE)
  const said = wrote(root, ["--message", "held"], PROPOSED, {
    ...givenIn(root),
    changeKind: MECHANICAL,
  })
  expect(said.code).toBe(0)
  expect(readFileSync(join(root, "akasha/two.ts"), "utf8")).toBe(PROPOSED)
  expect(git(root, ["log", "-1", "--pretty=%B"])).toContain(
    "Checks-bypassed: a `change-mechanical` change runs no check"
  )
})

test("a landing made by a program is told apart from a glass that was broken", () => {
  const root = repoWith()
  const said = wrote(root, ["--message", "held"], PROPOSED, {
    ...givenIn(root),
    changeKind: MECHANICAL,
  })
  expect(said.code).toBe(0)
  expect(said.report).toContain(`a \`change-mechanical\` change ${NO_CHECKS}`)
  expect(said.report.join("\n")).not.toContain("the glass was broken")
})

test("a loose body lands formatted and sorted, and the report says it did", () => {
  const root = repoWithTheFormatter()
  const said = wrote(root, ["--message", "held"], LOOSE)
  expect(said.refusals).toEqual([])
  expect(said.code).toBe(0)
  expect(readFileSync(join(root, "akasha/two.ts"), "utf8")).toBe(TIDY)
  expect(git(root, ["show", "HEAD:akasha/two.ts"])).toBe(TIDY)
  expect(said.report).toContain(REFORMATTED)
})

test("a body that will not parse lands whole rather than blank", () => {
  const root = repoWithTheFormatter()
  const said = wrote(root, ["--message", "held"], BROKEN)
  expect(said.code).toBe(0)
  expect(readFileSync(join(root, "akasha/two.ts"), "utf8")).toBe(BROKEN)
  expect(said.report).not.toContain(REFORMATTED)
})

test("a body already formatted lands untouched, and the report says nothing extra", () => {
  const root = repoWithTheFormatter()
  const said = wrote(root, ["--message", "held"], TIDY)
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

test("a folder left holding nothing by a removal is cleared off the disk", () => {
  const root = repoWith({ "akasha/one.ts": "committed\n", "akasha/deep/two.ts": "committed\n" })
  const said = write(["--remove", "akasha/deep/two.ts", "--message", "held"], givenIn(root))
  expect(said.refusals).toEqual([])
  expect(said.code).toBe(0)
  expect(existsSync(join(root, "akasha/deep/two.ts"))).toBe(false)
  expect(existsSync(join(root, "akasha/deep"))).toBe(false)
  expect(existsSync(join(root, "akasha"))).toBe(true)
})

test("a folder still holding a file git does not track is kept by a removal", () => {
  const root = repoWith({ "akasha/one.ts": "committed\n", "akasha/deep/two.ts": "committed\n" })
  put(root, "akasha/deep/unsaid.txt", "work in progress\n")
  const said = write(["--remove", "akasha/deep/two.ts", "--message", "held"], givenIn(root))
  expect(said.refusals).toEqual([])
  expect(said.code).toBe(0)
  expect(existsSync(join(root, "akasha/deep/two.ts"))).toBe(false)
  expect(existsSync(join(root, "akasha/deep/unsaid.txt"))).toBe(true)
  expect(existsSync(join(root, "akasha/deep"))).toBe(true)
})

test("the gate judges the formatted body, so a check refusing a loose one passes what lands", () => {
  const root = repoWithTheFormatter()
  checking(root, "refuses-loose", REFUSES_LOOSE)
  const said = wrote(root, ["--message", "held"], LOOSE)
  expect(said.refusals).toEqual([])
  expect(said.code).toBe(0)
  expect(readFileSync(join(root, "akasha/two.ts"), "utf8")).toBe(TIDY)
})

test("a body that lands is recorded as read, so writing over it again is not refused", () => {
  const root = repoWith()
  expect(wrote(root, []).code).toBe(0)
  const again = put(root, "again.txt", "written twice\n")
  const said = write(["--file-path", "akasha/two.ts", "--content-file", again], givenIn(root))
  expect(said.refusals).toEqual([])
  expect(said.code).toBe(0)
})

test("a body the formatter changed is recorded as it landed, not as it was handed in", () => {
  const root = repoWithTheFormatter()
  expect(wrote(root, [], LOOSE).report).toContain(REFORMATTED)
  const said = write(
    ["--file-path", "akasha/two.ts", "--content-file", put(root, "again.txt", TIDY)],
    givenIn(root)
  )
  expect(said.refusals).toEqual([])
  expect(said.code).toBe(0)
})
