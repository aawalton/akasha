import { describe, expect, test } from "bun:test"
import { parseNavConfig } from "./nav-config"

describe("parseNavConfig — DNI-parent config boundary", () => {
  test("parses a nav config carrying a locked facet (object input)", () => {
    const parsed = parseNavConfig({ locked: { editView: true } })
    expect(parsed?.locked?.editView).toBe(true)
  })

  test("parses a nav config carrying a locked facet (string input)", () => {
    const parsed = parseNavConfig(JSON.stringify({ locked: { pageType: true } }))
    expect(parsed?.locked?.pageType).toBe(true)
  })

  test("an aggregate lock key round-trips", () => {
    const parsed = parseNavConfig({ locked: { editPages: true } })
    expect(parsed?.locked?.editPages).toBe(true)
  })

  test("no config ⇒ undefined (the common case: nav carries only backHref today)", () => {
    expect(parseNavConfig(undefined)).toBeUndefined()
  })

  test("null ⇒ undefined", () => {
    expect(parseNavConfig(null)).toBeUndefined()
  })

  test("a nav config with no locked key parses with locked undefined", () => {
    const parsed = parseNavConfig({})
    expect(parsed).toBeDefined()
    expect(parsed?.locked).toBeUndefined()
  })

  test("tolerates (passes through) unrelated config keys alongside locked", () => {
    const parsed = parseNavConfig({ locked: { editView: true }, backHref: "/roster" })
    expect(parsed?.locked?.editView).toBe(true)
  })

  test("invalid locked value ⇒ undefined (Boundary Parsing: reject at the edge)", () => {
    expect(parseNavConfig({ locked: { editView: "yes" } })).toBeUndefined()
  })
})
