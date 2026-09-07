import { expect, test } from "bun:test"
import { decideOpenUrlRoute, decidePushRoute } from "./push-routing.module.code.ts"

test("a payload naming a path inside the app opens it", () => {
  expect(decidePushRoute({ path: "/pages/notification" })).toBe("/pages/notification")
})

test("a payload naming no path opens nothing", () => {
  expect(decidePushRoute(null)).toBe(null)
  expect(decidePushRoute({})).toBe(null)
  expect(decidePushRoute({ path: 7 })).toBe(null)
})

test("a payload naming somewhere outside the app opens nothing", () => {
  expect(decidePushRoute({ path: "https://example.invalid/pages" })).toBe(null)
  expect(decidePushRoute({ path: "//example.invalid/pages" })).toBe(null)
  expect(decidePushRoute({ path: "pages" })).toBe(null)
})

test("a deep link is read for its path and its query alone", () => {
  expect(decideOpenUrlRoute("https://alanwalton.com/pages?open=1")).toBe("/pages?open=1")
})

test("a deep link that is no url opens nothing", () => {
  expect(decideOpenUrlRoute("not a url")).toBe(null)
  expect(decideOpenUrlRoute(null)).toBe(null)
  expect(decideOpenUrlRoute(7)).toBe(null)
})
