import { expect, test } from "bun:test"
import { routeFor } from "akasha/command/arguments/modules/routing/argument-routing.module.code.ts"

test("a route argument is the argument it routes with the suffix on the end", () => {
  expect(routeFor("--body")).toBe("--body-file")
})
