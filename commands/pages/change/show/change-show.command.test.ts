import { expect, test } from "bun:test"
import {
  changeShow,
  pathIn,
  shownOf,
} from "akasha/commands/pages/change/show/change-show.command.code.ts"

const ROOT = "/repo"

const OUTSIDE = {
  root: ROOT,
  calledAs: "akasha change show",
  from: "test",
  writer: null,
  agentId: null,
}

test("the help flag is answered rather than refused as a flag", () => {
  const said = changeShow(["--help"], OUTSIDE)
  expect(said.code).toBe(0)
  expect(said.refusals).toEqual([])
  expect(said.report[0]).toBe(OUTSIDE.calledAs)
})

test("the path is read against the repository root", () => {
  expect(pathIn(ROOT, { at: "a/b.ts" })).toBe("a/b.ts")
  expect(pathIn(ROOT, { at: "/repo/a/b.ts" })).toBe("a/b.ts")
})

test("a path outside the repository is refused", () => {
  expect(pathIn(ROOT, { at: "../elsewhere.ts" })).toHaveLength(1)
  expect(pathIn(ROOT, { at: "/elsewhere/other.ts" })).toHaveLength(1)
})

test("an argument a show does not take is refused", () => {
  expect(pathIn(ROOT, { at: "a.ts", message: "x" })).toEqual([
    "`message` is no argument a show takes",
  ])
})

test("a call naming no path is refused rather than showing every path", () => {
  expect(pathIn(ROOT, {})).toEqual(["`at` names the path to show, and this call named none"])
  expect(pathIn(ROOT, { at: "   " })).toEqual([
    "`at` names the path to show, and this call named none",
  ])
})

test("the body is shown with its lines numbered", () => {
  const said = shownOf("a/b.ts", "one\ntwo\n")
  expect(said[0]).toBe("a/b.ts — the body once the edits kept land, 2 lines")
  expect(said[1]).toContain("one")
  expect(said[1]).toContain("two")
})

test("a body holding no line is said to be empty rather than shown", () => {
  expect(shownOf("a/b.ts", "")[0]).toBe(
    "a/b.ts — it is empty once the edits kept land; nothing follows"
  )
})
