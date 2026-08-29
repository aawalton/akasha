import { expect, test } from "bun:test"
import { shownIn } from "./path-showing.module.code.ts"

const ROOT = "/one/two"

test("a path under the root is said relative to it", () => {
  expect(shownIn(ROOT, `${ROOT}/three/four.ts`)).toBe("three/four.ts")
})

test("a path outside the root is said whole", () => {
  expect(shownIn(ROOT, "/one/five/six.ts")).toBe("/one/five/six.ts")
})

test("a path above the root is said whole rather than climbed out of", () => {
  expect(shownIn(ROOT, "/one")).toBe("/one")
})

test("the root itself is said whole, because relative to itself it is nothing", () => {
  expect(shownIn(ROOT, ROOT)).toBe(ROOT)
})

test("a path whose name only begins like the root is outside it", () => {
  expect(shownIn(ROOT, "/one/twothree/four.ts")).toBe("/one/twothree/four.ts")
})

test("nothing has to stand at a path for it to be shown", () => {
  expect(shownIn(ROOT, `${ROOT}/nothing/stands/here.ts`)).toBe("nothing/stands/here.ts")
})
