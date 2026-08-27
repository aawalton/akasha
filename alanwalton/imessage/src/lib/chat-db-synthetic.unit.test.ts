import { Database } from "bun:sqlite"
import { describe, expect, test } from "bun:test"
import { buildCountUnreadSql, buildRecentSql, buildSearchSql, buildUnreadListSql } from "./chat-db"

const SYNTHETIC_INBOUND_HANDLE = 7
const SYNTHETIC_CHAT = 3
const INBOUND_ROWID = 100
const SENT_ROWID = 101

interface ScopedRow {
  readonly rowid: number
  readonly is_from_me: number
}

function makeSyntheticChatDb(): Database {
  const db = new Database(":memory:")
  db.run("CREATE TABLE handle (ROWID INTEGER PRIMARY KEY, id TEXT)")
  db.run(
    "CREATE TABLE message (ROWID INTEGER PRIMARY KEY, guid TEXT, text TEXT, attributedBody BLOB, is_from_me INTEGER, date INTEGER, handle_id INTEGER, balloon_bundle_id TEXT)"
  )
  db.run(
    "CREATE TABLE chat (ROWID INTEGER PRIMARY KEY, chat_identifier TEXT, display_name TEXT, service_name TEXT)"
  )
  db.run("CREATE TABLE chat_message_join (message_id INTEGER, chat_id INTEGER)")
  db.run("CREATE TABLE chat_handle_join (chat_id INTEGER, handle_id INTEGER)")
  db.run("INSERT INTO handle (ROWID, id) VALUES (?, ?)", [SYNTHETIC_INBOUND_HANDLE, "synthetic-id"])
  db.run(
    "INSERT INTO chat (ROWID, chat_identifier, display_name, service_name) VALUES (?, ?, ?, ?)",
    [SYNTHETIC_CHAT, "synthetic-chat", "", "SMS"]
  )
  db.run("INSERT INTO chat_handle_join (chat_id, handle_id) VALUES (?, ?)", [
    SYNTHETIC_CHAT,
    SYNTHETIC_INBOUND_HANDLE,
  ])
  db.run(
    "INSERT INTO message (ROWID, guid, text, attributedBody, is_from_me, date, handle_id, balloon_bundle_id) VALUES (?, ?, ?, NULL, ?, ?, ?, NULL)",
    [INBOUND_ROWID, "synthetic-in", "synthetic message body", 0, 1000, SYNTHETIC_INBOUND_HANDLE]
  )
  db.run("INSERT INTO chat_message_join (message_id, chat_id) VALUES (?, ?)", [
    INBOUND_ROWID,
    SYNTHETIC_CHAT,
  ])
  db.run(
    "INSERT INTO message (ROWID, guid, text, attributedBody, is_from_me, date, handle_id, balloon_bundle_id) VALUES (?, ?, ?, NULL, ?, ?, ?, NULL)",
    [SENT_ROWID, "synthetic-out", "synthetic message body", 1, 1001, 0]
  )
  db.run("INSERT INTO chat_message_join (message_id, chat_id) VALUES (?, ?)", [
    SENT_ROWID,
    SYNTHETIC_CHAT,
  ])
  return db
}

function rowidsFrom(db: Database, sql: string): ReadonlySet<number> {
  return new Set(
    db
      .query<ScopedRow, []>(sql)
      .all()
      .map((r) => r.rowid)
  )
}

describe("contact-scoped reads include Alan's sent rows (chat-membership scoping)", () => {
  test("buildRecentSql returns BOTH the inbound and the sent (handle_id=0) row", () => {
    const db = makeSyntheticChatDb()
    const rowids = rowidsFrom(
      db,
      buildRecentSql({ limit: 50, handleRowids: [SYNTHETIC_INBOUND_HANDLE] })
    )
    expect(rowids.has(INBOUND_ROWID)).toBe(true)
    expect(rowids.has(SENT_ROWID)).toBe(true)
  })

  test("buildSearchSql returns BOTH the inbound and the sent (handle_id=0) row", () => {
    const db = makeSyntheticChatDb()
    const rowids = rowidsFrom(
      db,
      buildSearchSql({ query: "synthetic", limit: 50, handleRowids: [SYNTHETIC_INBOUND_HANDLE] })
    )
    expect(rowids.has(INBOUND_ROWID)).toBe(true)
    expect(rowids.has(SENT_ROWID)).toBe(true)
  })

  test("the naive `m.handle_id IN (inbound)` filter WOULD drop the sent row — the footgun avoided", () => {
    const db = makeSyntheticChatDb()
    const rowids = rowidsFrom(
      db,
      `SELECT m.ROWID AS rowid, m.is_from_me AS is_from_me FROM message m WHERE m.handle_id IN (${SYNTHETIC_INBOUND_HANDLE})`
    )
    expect(rowids.has(INBOUND_ROWID)).toBe(true)
    expect(rowids.has(SENT_ROWID)).toBe(false)
  })

  test("contact-scoped SQL scopes by chat membership and never by a message-level handle filter", () => {
    const recent = buildRecentSql({ limit: 20, handleRowids: [SYNTHETIC_INBOUND_HANDLE] })
    const search = buildSearchSql({
      query: "x",
      limit: 20,
      handleRowids: [SYNTHETIC_INBOUND_HANDLE],
    })
    for (const sql of [recent, search]) {
      expect(sql).toContain("chat_handle_join")
      expect(sql).not.toMatch(/m\.handle_id\s+IN/i)
    }
  })
})

const ALAN_NUMBER = "+16085122510"
const OTHER_NUMBER = "+16085122511"
const THIRD_PARTY_HANDLE = 7
const THIRD_PARTY_NUMBER = "+12105550000"
const ALAN_HANDLE = 8

interface CountRow {
  readonly unread: number
}
interface RowidRow {
  readonly rowid: number
}

function makeUnreadChatDb(): Database {
  const db = new Database(":memory:")
  db.run("CREATE TABLE handle (ROWID INTEGER PRIMARY KEY, id TEXT)")
  db.run(
    "CREATE TABLE message (ROWID INTEGER PRIMARY KEY, guid TEXT, text TEXT, attributedBody BLOB, is_from_me INTEGER, is_read INTEGER, item_type INTEGER, date INTEGER, handle_id INTEGER, balloon_bundle_id TEXT, destination_caller_id TEXT)"
  )
  db.run(
    "CREATE TABLE chat (ROWID INTEGER PRIMARY KEY, chat_identifier TEXT, display_name TEXT, service_name TEXT)"
  )
  db.run("CREATE TABLE chat_message_join (message_id INTEGER, chat_id INTEGER)")
  db.run("CREATE TABLE chat_handle_join (chat_id INTEGER, handle_id INTEGER)")
  db.run("INSERT INTO handle (ROWID, id) VALUES (?, ?)", [THIRD_PARTY_HANDLE, THIRD_PARTY_NUMBER])
  db.run("INSERT INTO handle (ROWID, id) VALUES (?, ?)", [ALAN_HANDLE, ALAN_NUMBER])

  const insertMsg = (m: {
    rowid: number
    isFromMe: number
    isRead: number
    itemType: number
    balloon: string | null
    dest: string
    ageSeconds: number
    senderHandle: number
  }): undefined => {
    db.run(
      "INSERT INTO message (ROWID, guid, text, attributedBody, is_from_me, is_read, item_type, date, handle_id, balloon_bundle_id, destination_caller_id) " +
        "VALUES (?, ?, NULL, NULL, ?, ?, ?, (strftime('%s','now') - 978307200 - ?) * 1000000000, ?, ?, ?)",
      [
        m.rowid,
        `g${m.rowid}`,
        m.isFromMe,
        m.isRead,
        m.itemType,
        m.ageSeconds,
        m.senderHandle,
        m.balloon,
        m.dest,
      ]
    )
  }

  insertMsg({
    rowid: 1,
    isFromMe: 0,
    isRead: 0,
    itemType: 0,
    balloon: null,
    dest: ALAN_NUMBER,
    ageSeconds: 100,
    senderHandle: THIRD_PARTY_HANDLE,
  })
  insertMsg({
    rowid: 2,
    isFromMe: 0,
    isRead: 1,
    itemType: 0,
    balloon: null,
    dest: ALAN_NUMBER,
    ageSeconds: 100,
    senderHandle: THIRD_PARTY_HANDLE,
  })
  insertMsg({
    rowid: 3,
    isFromMe: 1,
    isRead: 0,
    itemType: 0,
    balloon: null,
    dest: ALAN_NUMBER,
    ageSeconds: 100,
    senderHandle: THIRD_PARTY_HANDLE,
  })
  insertMsg({
    rowid: 4,
    isFromMe: 0,
    isRead: 0,
    itemType: 0,
    balloon: "com.apple.messages.URLBalloonProvider",
    dest: ALAN_NUMBER,
    ageSeconds: 100,
    senderHandle: THIRD_PARTY_HANDLE,
  })
  insertMsg({
    rowid: 5,
    isFromMe: 0,
    isRead: 0,
    itemType: 1,
    balloon: null,
    dest: ALAN_NUMBER,
    ageSeconds: 100,
    senderHandle: THIRD_PARTY_HANDLE,
  })
  insertMsg({
    rowid: 6,
    isFromMe: 0,
    isRead: 0,
    itemType: 0,
    balloon: null,
    dest: ALAN_NUMBER,
    ageSeconds: 4_000_000,
    senderHandle: THIRD_PARTY_HANDLE,
  })
  insertMsg({
    rowid: 7,
    isFromMe: 0,
    isRead: 0,
    itemType: 0,
    balloon: null,
    dest: OTHER_NUMBER,
    ageSeconds: 100,
    senderHandle: THIRD_PARTY_HANDLE,
  })
  insertMsg({
    rowid: 8,
    isFromMe: 0,
    isRead: 0,
    itemType: 0,
    balloon: null,
    dest: ALAN_NUMBER,
    ageSeconds: 200,
    senderHandle: THIRD_PARTY_HANDLE,
  })
  insertMsg({
    rowid: 9,
    isFromMe: 0,
    isRead: 0,
    itemType: 0,
    balloon: null,
    dest: ALAN_NUMBER,
    ageSeconds: 100,
    senderHandle: ALAN_HANDLE,
  })
  return db
}

describe("unread-list and unread-count agree on the same chat.db", () => {
  test("count(unread-list rows) == unread-count, both == the 2 genuine unread, self-echo excluded", () => {
    const db = makeUnreadChatDb()
    const count = db.query<CountRow, []>(buildCountUnreadSql()).all()[0]?.unread ?? 0
    const listRowids = new Set(
      db
        .query<RowidRow, []>(buildUnreadListSql())
        .all()
        .map((r) => r.rowid)
    )
    expect(count).toBe(2)
    expect(listRowids).toEqual(new Set([1, 8]))
    expect(listRowids.has(9)).toBe(false)
    expect(listRowids.size).toBe(count)
  })
})
