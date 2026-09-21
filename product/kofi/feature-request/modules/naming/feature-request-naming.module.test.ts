import { expect, test } from "bun:test"
import { requestSlugFor } from "akasha/product/kofi/feature-request/modules/naming/feature-request-naming.module.code.ts"

const FREE: ReadonlySet<string> = new Set<string>()

const LONG = "one two three ".repeat(20)

test("an ask is named in lower kebab case", () => {
  expect(requestSlugFor("Let me BACK a request!", FREE)).toBe("let-me-back-a-request")
})

test("a run of anything but letters and digits folds to one dash", () => {
  expect(requestSlugFor("  what???  now  ", FREE)).toBe("what-now")
})

test("a long ask is held to eighty characters with no dash at either end", () => {
  const named = requestSlugFor(LONG, FREE)
  expect(named.length).toBe(80)
  expect(named.startsWith("-")).toBe(false)
  expect(named.endsWith("-")).toBe(false)
  expect(named.includes("--")).toBe(false)
})

test("an ask folding to nothing is named `request`", () => {
  expect(requestSlugFor("!!! ???", FREE)).toBe("request")
})

test("a name no request holds takes no number", () => {
  expect(requestSlugFor("Dark mode", new Set(["light-mode"]))).toBe("dark-mode")
})

test("a name another request holds takes the first free number", () => {
  expect(requestSlugFor("Dark mode", new Set(["dark-mode", "dark-mode-2"]))).toBe("dark-mode-3")
})
