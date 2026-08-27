import { describe, expect, test } from "bun:test"
import { viewMatchesRow } from "./view-match"

const EMPTY_OVERLAY = {} as const
const NO_MATERIALIZED: ReadonlySet<string> = new Set()
const NO_CONTENT: ReadonlySet<string> = new Set()
const RICH_DOC_KEYS: ReadonlySet<string> = new Set(["notes"])

const emptyBlocks = { blocks: [] }
const singleBlankBlock = { blocks: [{ type: "paragraph", text: "" }] }
const whitespaceBlock = { blocks: [{ type: "paragraph", text: "   " }] }
const realNotes = { blocks: [{ type: "paragraph", text: "a real note" }] }

function matchOne(
  value: unknown,
  cond: { readonly key: string } & ({ isEmpty: true } | { isNotEmpty: true })
): boolean {
  const page = value === undefined ? { title: "p" } : { title: "p", notes: value }
  return viewMatchesRow(page, [cond], EMPTY_OVERLAY, NO_MATERIALIZED, NO_CONTENT, RICH_DOC_KEYS)
}

describe("viewMatchesRow — indexed rich-document emptiness lowering (#15044)", () => {
  test('isNotEmpty DROPS a {"blocks":[]} document (the reopen counter-case)', () => {
    expect(matchOne(emptyBlocks, { key: "notes", isNotEmpty: true })).toBe(false)
  })

  test("isNotEmpty DROPS a single-blank-block document", () => {
    expect(matchOne(singleBlankBlock, { key: "notes", isNotEmpty: true })).toBe(false)
  })

  test("isNotEmpty DROPS a whitespace-only block document", () => {
    expect(matchOne(whitespaceBlock, { key: "notes", isNotEmpty: true })).toBe(false)
  })

  test("isNotEmpty PASSES a document with real note text", () => {
    expect(matchOne(realNotes, { key: "notes", isNotEmpty: true })).toBe(true)
  })

  test('isEmpty is the exact complement — {"blocks":[]} and blank docs are empty', () => {
    expect(matchOne(emptyBlocks, { key: "notes", isEmpty: true })).toBe(true)
    expect(matchOne(singleBlankBlock, { key: "notes", isEmpty: true })).toBe(true)
    expect(matchOne(whitespaceBlock, { key: "notes", isEmpty: true })).toBe(true)
    expect(matchOne(realNotes, { key: "notes", isEmpty: true })).toBe(false)
  })

  test("an absent rich-document value reads as empty", () => {
    expect(matchOne(undefined, { key: "notes", isEmpty: true })).toBe(true)
    expect(matchOne(undefined, { key: "notes", isNotEmpty: true })).toBe(false)
  })

  test("a NON-rich-document key still uses the ordinary value emptiness check", () => {
    const page = { title: "p", tags: { blocks: [] } }
    expect(
      viewMatchesRow(
        page,
        [{ key: "tags", isNotEmpty: true }],
        EMPTY_OVERLAY,
        NO_MATERIALIZED,
        NO_CONTENT,
        RICH_DOC_KEYS
      )
    ).toBe(true)
  })
})
