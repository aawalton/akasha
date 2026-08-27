import { describe, expect, test } from "bun:test"
import { normalizeStack } from "./normalize-stack"

describe("normalizeStack", () => {
  test("strips :line:col position suffixes", () => {
    expect(normalizeStack("at f (app.js:128:34)")).toBe("at f (app.js)")
  })

  test("strips a bare :line suffix", () => {
    expect(normalizeStack("at f (app.js:128)")).toBe("at f (app.js)")
  })

  test("reduces absolute bundle paths to the basename", () => {
    expect(normalizeStack("at f (/var/www/build/assets/app.js:1:1)")).toBe("at f (app.js)")
  })

  test("reduces URL paths to the basename", () => {
    expect(normalizeStack("at f (https://alanwalton.com/assets/app.js:1:1)")).toBe("at f (app.js)")
  })

  test("de-hashes asset filenames", () => {
    expect(normalizeStack("at f (app-ABC123.js)")).toBe("at f (app.js)")
  })

  test("groups two stacks differing only in line/col numbers", () => {
    const a = "Error\n  at f (app.js:10:5)\n  at g (app.js:22:9)"
    const b = "Error\n  at f (app.js:88:1)\n  at g (app.js:104:3)"
    expect(normalizeStack(a)).toBe(normalizeStack(b))
  })

  test("groups two stacks differing only in asset hashes", () => {
    const a = "Error\n  at f (/dist/app-9f8e7d.js:10:5)"
    const b = "Error\n  at f (/dist/app-1a2b3c.js:99:1)"
    expect(normalizeStack(a)).toBe(normalizeStack(b))
  })

  test("collapses consecutive duplicate frames", () => {
    const stack =
      "Error\n  at recurse (app.js:5:1)\n  at recurse (app.js:5:1)\n  at recurse (app.js:5:1)"
    expect(normalizeStack(stack)).toBe("Error\n  at recurse (app.js)")
  })

  test("does not collapse non-consecutive duplicate frames", () => {
    const stack = "at a (app.js:1:1)\nat b (app.js:2:1)\nat a (app.js:3:1)"
    expect(normalizeStack(stack)).toBe("at a (app.js)\nat b (app.js)\nat a (app.js)")
  })

  test("is idempotent", () => {
    const stack =
      "Error\n  at f (https://host/assets/app-ABC123.js:10:5)\n  at f (https://host/assets/app-ABC123.js:10:5)"
    const once = normalizeStack(stack)
    expect(normalizeStack(once)).toBe(once)
  })

  test("leaves an empty stack empty", () => {
    expect(normalizeStack("")).toBe("")
  })
})
