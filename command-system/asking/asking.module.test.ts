import { afterAll, expect, test } from "bun:test"
import { existsSync, readFileSync } from "node:fs"
import { join } from "node:path"
import { REFUSES_CODE } from "@akasha/testing-system/minting"
import { put } from "@akasha/testing-system/putting"
import { baseOf as headOf } from "../landing/landing.module.code.ts"
import { landingAsked } from "./asking.module.code.ts"
import {
  applied,
  asking,
  blocked,
  checking,
  commitIn,
  givenIn,
  landedFrom,
  PROPOSED,
  REFUSES_TAKING,
  reaching,
  repoNoCheckLoads,
  repoWith,
  scratch,
  seeded,
  treeHolds,
  UNLOADABLE_AT,
  wrote,
  wroteWith,
} from "./asking.module.test-fixtures.ts"

afterAll(scratch.sweep)

test("a report that could not be built leaves the landing in place, and says so", async () => {
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

test("checks that will not load refuse the change, and nothing reaches the disk", async () => {
  const root = repoNoCheckLoads()
  const was = headOf(root)
  const said = await wrote(root, ["--message", "held"])
  expect(said.code).toBe(3)
  expect(said.refusals.join("\n")).toContain("the checks could not be loaded from")
  expect(said.refusals.join("\n")).toContain(
    `${UNLOADABLE_AT} is a check's code, and would not load`
  )
  expect(said.refusals.join("\n")).toContain("nothing was judged and nothing was written")
  expect(existsSync(join(root, "akasha/two.ts"))).toBe(false)
  expect(headOf(root)).toBe(was)
})

test("a link is repointed once the checks have loaded and never where they will not", async () => {
  const held: number[] = []
  const one = await landingAsked(givenIn(repoNoCheckLoads()), asking({ reaching: reaching(held) }))
  expect(one.code).toBe(3)
  expect(held.length).toBe(0)
  const at = asking({ saying: () => [], reaching: reaching(held) })
  expect((await landingAsked(givenIn(repoWith()), at)).code).toBe(0)
  expect(held.length).toBe(1)
})

test("the glass carries a patch past checks that will not load, and the commit says why", async () => {
  const root = repoNoCheckLoads()
  expect(seeded(root)).toBe(true)
  const said = await applied(
    root,
    { report: [], refusals: [], code: 0 },
    ["--message", "held", "--break-the-glass", "mid-refactor"],
    givenIn(root)
  )
  expect(said.code).toBe(0)
  expect(said.report).toContain("landed akasha/one.ts")
  const body = commitIn(root, said)
  expect(body).toContain("Checks-bypassed: mid-refactor")
  expect(body).toContain(`Checks-unloadable: ${UNLOADABLE_AT} is a check's code`)
})

test("a check is handed a removal, and can refuse it", async () => {
  const root = repoWith({ "akasha/one.ts": "committed\n", "akasha/two.ts": "committed\n" })
  checking(root, "refuses-taking", REFUSES_TAKING)
  const said = await wroteWith(root, ["--remove", "akasha/two.ts", "--message", "held"])
  expect(said.code).toBe(3)
  expect(said.refusals.join("\n")).toContain("akasha/two.ts — a check judged this going away")
  expect(existsSync(join(root, "akasha/two.ts"))).toBe(true)
  expect(treeHolds(root, "akasha/two.ts")).toBe(true)
})

test("breaking the glass runs no check and says so in the commit", async () => {
  const root = repoWith()
  checking(root, "refuses", REFUSES_CODE)
  const said = await wrote(root, [
    "--message",
    "held",
    "--break-the-glass",
    "the checks are themselves broken",
  ])
  expect(said.code).toBe(0)
  expect(readFileSync(join(root, "akasha/two.ts"), "utf8")).toBe(PROPOSED)
  expect(commitIn(root, said)).toContain("Checks-bypassed: the checks are themselves broken")
})

test("a body that lands is recorded as read, so writing over it again is not refused", async () => {
  const root = repoWith()
  expect((await wrote(root, [])).code).toBe(0)
  const again = put(root, "again.txt", "written twice\n")
  const said = await landedFrom(
    ["--file-path", "akasha/two.ts", "--content-file", again],
    givenIn(root)
  )
  expect(said.refusals).toEqual([])
  expect(said.code).toBe(0)
})
