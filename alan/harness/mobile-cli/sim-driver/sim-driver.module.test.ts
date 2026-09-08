import { describe, expect, test } from "bun:test"
import { APP_ORIGIN, buildAppUrl } from "./sim-driver.module.code.ts"

describe("buildAppUrl", () => {
  test("prefixes the app origin and adds a leading slash when missing", () => {
    expect(buildAppUrl("notes/note", false)).toBe(`${APP_ORIGIN}/notes/note`)
    expect(buildAppUrl("/notes/note", false)).toBe(`${APP_ORIGIN}/notes/note`)
  })

  test("appends kbDebug=1 with the correct separator", () => {
    expect(buildAppUrl("/x", true)).toBe(`${APP_ORIGIN}/x?kbDebug=1`)
    expect(buildAppUrl("/x?foo=1", true)).toBe(`${APP_ORIGIN}/x?foo=1&kbDebug=1`)
  })

  test("does not double-add kbDebug when already present", () => {
    expect(buildAppUrl("/x?kbDebug=1", true)).toBe(`${APP_ORIGIN}/x?kbDebug=1`)
  })

  test("omits kbDebug when not requested", () => {
    expect(buildAppUrl("/x?foo=1", false)).toBe(`${APP_ORIGIN}/x?foo=1`)
  })
})
