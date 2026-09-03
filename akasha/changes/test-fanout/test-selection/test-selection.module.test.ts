import { expect, test } from "bun:test"
import { decideTestSelection, placeWorkspace } from "./test-selection.module.code.ts"

const MAPPED = { reverseMap: { "src/a.ts": ["src/a.unit.test.ts"] } }

test("a workspace the map holds is mapped", () => {
  expect(placeWorkspace({ schemaVersion: 2, byWorkspace: { "tools/lib": {} } }, "tools/lib")).toBe(
    "mapped"
  )
})

test("a workspace the map names as outside it is outside the map", () => {
  expect(
    placeWorkspace({ schemaVersion: 2, byWorkspace: {}, outsideMap: ["infra/k8s"] }, "infra/k8s")
  ).toBe("outside-map")
})

test("a workspace neither held nor named outside was never discovered", () => {
  expect(
    placeWorkspace({ schemaVersion: 2, byWorkspace: {}, outsideMap: ["infra/k8s"] }, "tools/ops")
  ).toBe("undiscovered")
})

test("an artifact too old to state its population says the placement is unstated", () => {
  expect(placeWorkspace({ schemaVersion: 1, byWorkspace: {} }, "tools/ops")).toBe("unstated")
})

test("an artifact stating no population at all says the placement is unstated", () => {
  expect(placeWorkspace({ schemaVersion: 2, byWorkspace: {} }, "tools/ops")).toBe("unstated")
})

test("a workspace with no summary runs the full test set", () => {
  expect(decideTestSelection(undefined, ["src/a.ts"])).toEqual({ kind: "run-all" })
})

test("a change list of nothing runs the full test set", () => {
  expect(decideTestSelection(MAPPED, [])).toEqual({ kind: "run-all" })
})

test("a changed file that is no TypeScript file runs the full test set", () => {
  expect(decideTestSelection(MAPPED, ["src/a.ts", "README.md"])).toEqual({ kind: "run-all" })
})

test("a changed file the map names selects the tests that reach it", () => {
  expect(decideTestSelection(MAPPED, ["src/a.ts"])).toEqual({
    kind: "subset",
    tests: ["src/a.unit.test.ts"],
  })
})

test("a changed file the map does not name reaches no test", () => {
  expect(decideTestSelection(MAPPED, ["src/unknown.ts"])).toEqual({ kind: "subset", tests: [] })
})

test("a test reached by two changed files is selected once", () => {
  const summary = {
    reverseMap: { "src/a.ts": ["src/a.unit.test.ts"], "src/b.ts": ["src/a.unit.test.ts"] },
  }
  expect(decideTestSelection(summary, ["src/a.ts", "src/b.ts"])).toEqual({
    kind: "subset",
    tests: ["src/a.unit.test.ts"],
  })
})
