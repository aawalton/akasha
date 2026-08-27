import { describe, expect, test } from "bun:test"
import { Page } from "@shared/pages-core/page-types"
import { toPageWithProperties } from "./types"

function makePage(overrides: Record<string, unknown>): Page {
  return Page({
    id: "page-1",
    seq: 1,
    pageTypeId: "pt-1",
    pageTypeSlug: "thing",
    title: "Thing",
    icon: "file-text",
    ...overrides,
  })
}

describe("toPageWithProperties", () => {
  test("preserves the row's id on the adapter's promoted fields", () => {
    const out = toPageWithProperties(makePage({ id: "abc-123" }))
    expect(out._id).toBe("abc-123")
  })

  test("keeps the original row available as `properties` (caller still reaches other keys)", () => {
    const row = makePage({ createdAt: "2026-04-10T15:30:00.000Z", title: "X" })
    const out = toPageWithProperties(row)
    expect(out.properties).toBe(row)
    expect(out.properties["title"]).toBe("X")
  })
})
