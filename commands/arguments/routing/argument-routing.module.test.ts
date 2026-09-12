import { expect, test } from "bun:test"
import {
  routedBy,
  routeFor,
} from "akasha/commands/arguments/routing/argument-routing.module.code.ts"

test("a route argument is the argument it routes with the suffix on the end", () => {
  expect(routeFor("--body")).toBe("--body-file")
})

test("a route argument names the argument it routes", () => {
  expect(routedBy("--body-file")).toBe("--body")
})

test("a name ending in something else routes nothing", () => {
  expect(routedBy("--body")).toBeNull()
})

test("a name that is the suffix and nothing more routes nothing", () => {
  expect(routedBy("--file")).toBeNull()
  expect(routedBy("-file")).toBeNull()
  expect(routedBy("---file")).toBeNull()
})
