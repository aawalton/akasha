import { expect, test } from "bun:test"
import {
  type Graph,
  type Marks,
  splitIn,
  subjectIn,
  tested,
} from "akasha/check/code/pages/typecheck/modules/browser-reach/browser-reach.module.code.ts"

const ROUTE = "web/routes/home/home.route.code.tsx"

const PANEL = "ui/modules/panel/panel.module.code.tsx"

const SHARED = "core/modules/shape/shape.module.code.ts"

const SERVER = "web/.server/loading/loading.module.code.ts"

const LOADED = "core/modules/store/store.module.code.ts"

const COMMAND = "command/pages/run/run.command.code.ts"

const PAINTING = "harness/modules/painting/painting.module.code.ts"

const PICTURE = "harness/modules/picture/picture.module.code.ts"

const PANEL_TEST = "ui/modules/panel/panel.module.test.ts"

const SHAPE_TEST = "core/modules/shape/shape.module.test.ts"

const ONE = "loop/modules/one/one.module.code.ts"

const TWO = "loop/modules/two/two.module.code.ts"

const GRAPH: Graph = {
  nodes: [
    ROUTE,
    PANEL,
    SHARED,
    SERVER,
    LOADED,
    COMMAND,
    PAINTING,
    PICTURE,
    PANEL_TEST,
    SHAPE_TEST,
    ONE,
    TWO,
  ],
  edges: [
    { from: ROUTE, to: PANEL },
    { from: ROUTE, to: SERVER },
    { from: PANEL, to: SHARED },
    { from: SERVER, to: LOADED },
    { from: COMMAND, to: SHARED },
    { from: PICTURE, to: PAINTING },
    { from: PANEL_TEST, to: PANEL },
    { from: SHAPE_TEST, to: SHARED },
    { from: SHAPE_TEST, to: PANEL },
    { from: ONE, to: TWO },
    { from: TWO, to: ONE },
  ],
}

const SUBJECTS: ReadonlyMap<string, string> = new Map([
  [PANEL_TEST, PANEL],
  [SHAPE_TEST, SHARED],
])

const MARKS: Marks = {
  seeded: (one) => one === ROUTE || one === PAINTING,
  stated: (one) => one === PAINTING,
  subjectOf: (one) => SUBJECTS.get(one) ?? null,
}

const SPLIT = splitIn(GRAPH, MARKS)

test("a browser runs what a route imports, and that alone runs apart", () => {
  expect(SPLIT.browser.has(ROUTE)).toBe(true)
  expect(SPLIT.browser.has(PANEL)).toBe(true)
  expect(SPLIT.apart.has(PANEL)).toBe(true)
})

test("a file imported from outside a browser as well is not apart", () => {
  expect(SPLIT.browser.has(SHARED)).toBe(true)
  expect(SPLIT.apart.has(SHARED)).toBe(false)
})

test("a server module and what it imports run outside a browser", () => {
  expect(SPLIT.browser.has(SERVER)).toBe(false)
  expect(SPLIT.browser.has(LOADED)).toBe(false)
})

test("a module stating it runs in a browser is apart whatever imports it", () => {
  expect(SPLIT.apart.has(PAINTING)).toBe(true)
  expect(SPLIT.browser.has(PICTURE)).toBe(false)
})

test("a test runs where the code it tests runs, and makes nothing run outside", () => {
  expect(SPLIT.apart.has(PANEL_TEST)).toBe(true)
  expect(SPLIT.apart.has(SHAPE_TEST)).toBe(false)
  expect(SPLIT.browser.has(SHAPE_TEST)).toBe(false)
})

test("files importing each other with nothing above them run outside a browser", () => {
  expect(SPLIT.browser.has(ONE)).toBe(false)
  expect(SPLIT.browser.has(TWO)).toBe(false)
})

test("the code a test tests is the code file beside the same page", () => {
  const held = new Set(["a/b/thing.module.code.tsx", "c/d/check.check-code.decision.code.ts"])
  const holds = (one: string): boolean => held.has(one)
  expect(subjectIn("a/b/thing.module.test.ts", holds)).toBe("a/b/thing.module.code.tsx")
  expect(subjectIn("a/b/thing.module.test-fixtures.ts", holds)).toBe("a/b/thing.module.code.tsx")
  expect(subjectIn("c/d/check.check-code.decision.test.ts", holds)).toBe(
    "c/d/check.check-code.decision.code.ts"
  )
  expect(subjectIn("e/f/lone.module.test.ts", holds)).toBeNull()
  expect(tested("a/b/thing.module.code.tsx")).toBe(false)
})
