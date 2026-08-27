import { describe, expect, test } from "bun:test"
import { buildCountUnreadSql, buildRecentSql, buildSearchSql, buildUnreadListSql } from "./chat-db"

const BALLOON_FILTER = "m.balloon_bundle_id IS NULL"

function normalize(sql: string): string {
  return sql.replace(/\s+/g, " ").trim()
}

describe("buildRecentSql", () => {
  test("excludes app-balloon rows", () => {
    expect(buildRecentSql({ limit: 20 })).toContain(BALLOON_FILTER)
  })

  test("excludes app-balloon rows with a contact filter", () => {
    expect(buildRecentSql({ limit: 20, handleRowids: [1, 2] })).toContain(BALLOON_FILTER)
  })
})

describe("buildSearchSql", () => {
  test("excludes app-balloon rows", () => {
    expect(buildSearchSql({ query: "hi", limit: 20 })).toContain(BALLOON_FILTER)
  })

  test("excludes app-balloon rows with a contact filter", () => {
    expect(buildSearchSql({ query: "hi", limit: 20, handleRowids: [1, 2] })).toContain(
      BALLOON_FILTER
    )
  })
})

describe("buildCountUnreadSql", () => {
  test("selects a COUNT", () => {
    expect(normalize(buildCountUnreadSql()).toLowerCase()).toContain("count(")
  })

  test("filters to unread messages (is_read = 0)", () => {
    expect(normalize(buildCountUnreadSql())).toContain("is_read = 0")
  })

  test("filters to inbound messages only (is_from_me = 0)", () => {
    expect(normalize(buildCountUnreadSql())).toContain("is_from_me = 0")
  })

  test("preserves the app-balloon exclusion", () => {
    expect(buildCountUnreadSql()).toContain(BALLOON_FILTER)
  })

  test("restricts to a rolling 30-day recency window in Apple-epoch nanoseconds", () => {
    const sql = normalize(buildCountUnreadSql())
    expect(sql).toContain("strftime('%s','now')")
    expect(sql).toContain("978307200")
    expect(sql).toContain("2592000")
    expect(sql).toContain("1000000000")
    expect(sql).toContain("m.date >=")
  })

  test("restricts to Alan's 2510 number, both format variants", () => {
    const sql = normalize(buildCountUnreadSql())
    expect(sql).toContain("m.destination_caller_id IN ('+16085122510', 'tel:+16085122510')")
  })

  test("excludes the 2511 number, gmail, and null recipients", () => {
    const sql = buildCountUnreadSql()
    expect(sql).not.toContain("16085122511")
    expect(sql).not.toContain("aawalton@gmail.com")
  })

  test("counts only real text messages, excluding group/system events (item_type = 0)", () => {
    expect(normalize(buildCountUnreadSql())).toContain("item_type = 0")
  })

  test("excludes Alan's own self-text echoes (sender handle = his number, both id variants)", () => {
    expect(normalize(buildCountUnreadSql())).toContain(
      "m.handle_id NOT IN (SELECT ROWID FROM handle WHERE id IN ('+16085122510', 'tel:+16085122510'))"
    )
  })
})

const UNREAD_PREDICATE_FRAGMENTS = [
  "is_read = 0",
  "is_from_me = 0",
  BALLOON_FILTER,
  "item_type = 0",
  "strftime('%s','now')",
  "978307200",
  "2592000",
  "1000000000",
  "m.date >=",
  "m.destination_caller_id IN ('+16085122510', 'tel:+16085122510')",
  "m.handle_id NOT IN (SELECT ROWID FROM handle WHERE id IN ('+16085122510', 'tel:+16085122510'))",
]

describe("buildUnreadListSql", () => {
  test("shares the EXACT unread predicate with buildCountUnreadSql (single source of truth)", () => {
    const list = normalize(buildUnreadListSql())
    const count = normalize(buildCountUnreadSql())
    for (const fragment of UNREAD_PREDICATE_FRAGMENTS) {
      expect(list).toContain(fragment)
      expect(count).toContain(fragment)
    }
  })

  test("selects full message content rows, not a count", () => {
    const sql = buildUnreadListSql()
    expect(sql).toContain("m.guid")
    expect(sql).toContain("hex(m.attributedBody)")
    expect(sql.toLowerCase()).not.toContain("count(")
  })

  test("omits LIMIT by default (returns the full unread set)", () => {
    expect(buildUnreadListSql()).not.toContain("LIMIT")
    expect(buildUnreadListSql({})).not.toContain("LIMIT")
  })

  test("applies LIMIT when a limit is given", () => {
    expect(buildUnreadListSql({ limit: 5 })).toContain("LIMIT 5")
  })

  test("excludes app-balloon rows", () => {
    expect(buildUnreadListSql()).toContain(BALLOON_FILTER)
  })

  test("contact-scoping uses chat membership, never the naive m.handle_id IN footgun", () => {
    const sql = buildUnreadListSql({ handleRowids: [7] })
    expect(sql).toContain("chat_handle_join")
    expect(sql).not.toMatch(/m\.handle_id\s+IN/i)
  })
})
