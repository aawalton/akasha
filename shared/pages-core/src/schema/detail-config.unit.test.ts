import { describe, expect, test } from "bun:test"
import { detailConfigSchema, resolveDisplayKind } from "./detail-config"

describe("detailConfigSchema", () => {
  test("parses a full reader config", () => {
    const result = detailConfigSchema.safeParse({
      display: "reader",
      bodyPropertyId: "text",
      fullBleed: true,
      showReadingProgress: true,
    })
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data).toEqual({
        display: "reader",
        bodyPropertyId: "text",
        fullBleed: true,
        showReadingProgress: true,
      })
    }
  })

  test("accepts an empty object — every field is optional", () => {
    const result = detailConfigSchema.safeParse({})
    expect(result.success).toBe(true)
    if (result.success) expect(result.data).toEqual({})
  })

  test("strips unknown keys — extensible plain object, mirroring viewDataSchema", () => {
    const result = detailConfigSchema.safeParse({ display: "reader", future: "x" })
    expect(result.success).toBe(true)
    if (result.success) expect("future" in result.data).toBe(false)
  })

  test("strips the retired legacy `layout` key (#15569)", () => {
    const result = detailConfigSchema.safeParse({ layout: "reader" })
    expect(result.success).toBe(true)
    if (result.success) expect("layout" in result.data).toBe(false)
  })

  test("rejects a non-boolean fullBleed", () => {
    expect(detailConfigSchema.safeParse({ fullBleed: "yes" }).success).toBe(false)
  })

  test("parses the markReadOnEnd opt-in", () => {
    const result = detailConfigSchema.safeParse({ display: "reader", markReadOnEnd: true })
    expect(result.success).toBe(true)
    if (result.success) expect(result.data.markReadOnEnd).toBe(true)
  })

  test("rejects a non-boolean markReadOnEnd", () => {
    expect(detailConfigSchema.safeParse({ markReadOnEnd: "yes" }).success).toBe(false)
  })

  test("rejects a non-string bodyPropertyId", () => {
    expect(detailConfigSchema.safeParse({ bodyPropertyId: 42 }).success).toBe(false)
  })

  test("parses a built-in display value", () => {
    const result = detailConfigSchema.safeParse({ display: "reader" })
    expect(result.success).toBe(true)
    if (result.success) expect(result.data.display).toBe("reader")
  })

  test("parses a custom display slug (registry-resolved)", () => {
    for (const slug of ["idle", "awen", "chess", "chess-review", "persona", "question"]) {
      expect(detailConfigSchema.safeParse({ display: slug }).success).toBe(true)
    }
  })

  test("rejects a non-slug display value (must be anchored kebab slug)", () => {
    expect(detailConfigSchema.safeParse({ display: "Reader" }).success).toBe(false)
    expect(detailConfigSchema.safeParse({ display: "has space" }).success).toBe(false)
    expect(detailConfigSchema.safeParse({ display: "-lead" }).success).toBe(false)
  })

  test("parses the frame config surface", () => {
    const result = detailConfigSchema.safeParse({
      display: "reader",
      frame: { edgeToEdge: true, focusMode: true, autoScroll: { loadScroll: "progress" } },
    })
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.frame?.edgeToEdge).toBe(true)
      expect(result.data.frame?.focusMode).toBe(true)
      expect(result.data.frame?.autoScroll?.loadScroll).toBe("progress")
    }
  })

  test("accepts the 'new-top' top-anchored follow load-scroll (#15769)", () => {
    const result = detailConfigSchema.safeParse({
      frame: { autoScroll: { loadScroll: "new-top" } },
    })
    expect(result.success).toBe(true)
    if (result.success) expect(result.data.frame?.autoScroll?.loadScroll).toBe("new-top")
  })

  test("rejects an invalid frame.autoScroll.loadScroll", () => {
    expect(
      detailConfigSchema.safeParse({ frame: { autoScroll: { loadScroll: "middle" } } }).success
    ).toBe(false)
  })
})

describe("resolveDisplayKind", () => {
  test("returns the declared display", () => {
    expect(resolveDisplayKind({ display: "idle" })).toBe("idle")
    expect(resolveDisplayKind({ display: "collection" })).toBe("collection")
  })

  test("returns undefined when no display is set", () => {
    expect(resolveDisplayKind({})).toBeUndefined()
    expect(resolveDisplayKind(undefined)).toBeUndefined()
  })
})
