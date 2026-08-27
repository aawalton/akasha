import { describe, expect, test } from "bun:test"
import { matchesAllowedOrigin } from "./cors-core"

const EXACT = ["https://alanwalton.com", "http://localhost:3010"]
const PATTERNS = [/^http:\/\/localhost:3[0-4][0-9]{2}$/]

describe("matchesAllowedOrigin", () => {
  test("null origin is rejected", () => {
    expect(matchesAllowedOrigin(null, EXACT, PATTERNS)).toBe(false)
  })

  test("exact-match origin is allowed", () => {
    expect(matchesAllowedOrigin("https://alanwalton.com", EXACT, PATTERNS)).toBe(true)
  })

  test("pattern-match origin is allowed across all five app ranges", () => {
    expect(matchesAllowedOrigin("http://localhost:3000", EXACT, PATTERNS)).toBe(true)
    expect(matchesAllowedOrigin("http://localhost:3099", EXACT, PATTERNS)).toBe(true)
    expect(matchesAllowedOrigin("http://localhost:3185", EXACT, PATTERNS)).toBe(true)
    expect(matchesAllowedOrigin("http://localhost:3285", EXACT, PATTERNS)).toBe(true)
    expect(matchesAllowedOrigin("http://localhost:3399", EXACT, PATTERNS)).toBe(true)
    expect(matchesAllowedOrigin("http://localhost:3400", EXACT, PATTERNS)).toBe(true)
    expect(matchesAllowedOrigin("http://localhost:3499", EXACT, PATTERNS)).toBe(true)
  })

  test("origin outside pattern range is rejected", () => {
    expect(matchesAllowedOrigin("http://localhost:3500", EXACT, PATTERNS)).toBe(false)
    expect(matchesAllowedOrigin("http://localhost:2999", EXACT, PATTERNS)).toBe(false)
    expect(matchesAllowedOrigin("http://localhost:4000", EXACT, PATTERNS)).toBe(false)
  })

  test("pattern is anchored — substring does not match", () => {
    expect(matchesAllowedOrigin("http://localhost:3085.attacker.com", EXACT, PATTERNS)).toBe(false)
    expect(matchesAllowedOrigin("https://evil.com/?http://localhost:3085", EXACT, PATTERNS)).toBe(
      false
    )
  })

  test("unrelated origin is rejected", () => {
    expect(matchesAllowedOrigin("https://evil.com", EXACT, PATTERNS)).toBe(false)
  })

  test("empty allowlists reject everything", () => {
    expect(matchesAllowedOrigin("https://alanwalton.com", [], [])).toBe(false)
    expect(matchesAllowedOrigin("http://localhost:3085", [], [])).toBe(false)
  })
})
