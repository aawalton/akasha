import { describe, expect, test } from "bun:test"
import { NON_EMPTY_CONTENT_KEYS_ATTR } from "@shared/pages-core/schema/content-tier"
import { viewMatchesRow } from "./view-match"

const EMPTY_OVERLAY = {} as const
const NO_MATERIALIZED: ReadonlySet<string> = new Set()
const CONTENT_KEYS: ReadonlySet<string> = new Set(["alanNotes"])
const NO_RICH_DOC: ReadonlySet<string> = new Set()

describe("viewMatchesRow — content-tier presence lowering", () => {
  test("isNotEmpty passes a row whose nonEmptyContentKeys contains the key", () => {
    const page = { title: "p", [NON_EMPTY_CONTENT_KEYS_ATTR]: ["alanNotes"] }
    expect(
      viewMatchesRow(
        page,
        [{ key: "alanNotes", isNotEmpty: true }],
        EMPTY_OVERLAY,
        NO_MATERIALIZED,
        CONTENT_KEYS,
        NO_RICH_DOC
      )
    ).toBe(true)
  })

  test("isNotEmpty drops a row whose presence array omits the key", () => {
    const page = { title: "p", [NON_EMPTY_CONTENT_KEYS_ATTR]: [] }
    expect(
      viewMatchesRow(
        page,
        [{ key: "alanNotes", isNotEmpty: true }],
        EMPTY_OVERLAY,
        NO_MATERIALIZED,
        CONTENT_KEYS,
        NO_RICH_DOC
      )
    ).toBe(false)
  })

  test("isNotEmpty drops a row with no presence attribute at all", () => {
    const page = { title: "p" }
    expect(
      viewMatchesRow(
        page,
        [{ key: "alanNotes", isNotEmpty: true }],
        EMPTY_OVERLAY,
        NO_MATERIALIZED,
        CONTENT_KEYS,
        NO_RICH_DOC
      )
    ).toBe(false)
  })

  test("isEmpty is the exact complement of isNotEmpty over presence membership", () => {
    const present = { title: "p", [NON_EMPTY_CONTENT_KEYS_ATTR]: ["alanNotes"] }
    const absent = { title: "q", [NON_EMPTY_CONTENT_KEYS_ATTR]: [] }
    const filter = [{ key: "alanNotes", isEmpty: true }] as const
    expect(
      viewMatchesRow(present, filter, EMPTY_OVERLAY, NO_MATERIALIZED, CONTENT_KEYS, NO_RICH_DOC)
    ).toBe(false)
    expect(
      viewMatchesRow(absent, filter, EMPTY_OVERLAY, NO_MATERIALIZED, CONTENT_KEYS, NO_RICH_DOC)
    ).toBe(true)
  })

  test("a NON-content key still uses the ordinary value emptiness check", () => {
    const withValue = { title: "p", tags: ["x"] }
    const emptyValue: Record<string, unknown> = { title: "q", tags: [] }
    const filter = [{ key: "tags", isNotEmpty: true }] as const
    expect(
      viewMatchesRow(withValue, filter, EMPTY_OVERLAY, NO_MATERIALIZED, CONTENT_KEYS, NO_RICH_DOC)
    ).toBe(true)
    expect(
      viewMatchesRow(emptyValue, filter, EMPTY_OVERLAY, NO_MATERIALIZED, CONTENT_KEYS, NO_RICH_DOC)
    ).toBe(false)
  })
})
