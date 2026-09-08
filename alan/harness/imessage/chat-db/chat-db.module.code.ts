import { padTwo } from "@akasha/digit-padding"
import { z } from "zod"
import { handleKey } from "../contacts-db/contacts-db.module.code.ts"
import { decodeAttributedBody } from "../typedstream/typedstream.module.code.ts"

const messageRowSchema = z
  .object({
    rowid: z.number(),
    guid: z.string(),
    text: z.string().nullable(),
    attributed_body_hex: z.string().nullable(),
    is_from_me: z.number(),
    unix_seconds: z.number(),
    handle_id: z.string().nullable(),
    chat_identifier: z.string().nullable(),
    chat_display_name: z.string().nullable(),
  })
  .strict()

const messageRowsSchema = z.array(messageRowSchema)

const handleRowSchema = z.object({ rowid: z.number(), id: z.string() }).strict()
const handleRowsSchema = z.array(handleRowSchema)

const unreadCountRowSchema = z.object({ unread: z.number() }).strict()
const unreadCountRowsSchema = z.array(unreadCountRowSchema)

export interface ImessageHandle {
  readonly rowid: number
  readonly id: string
}

export interface ImessageMessage {
  readonly rowid: number
  readonly guid: string
  readonly text: string
  readonly isFromMe: boolean
  readonly unixSeconds: number
  readonly handleId: string | null
  readonly chatIdentifier: string | null
  readonly chatDisplayName: string | null
}

function escapeSqlString(value: string): string {
  return value.replaceAll("'", "''")
}

function escapeLikePattern(value: string): string {
  return value.replace(/[\\%_]/g, (m) => `\\${m}`)
}

const MESSAGE_SELECT = `
SELECT m.ROWID AS rowid, m.guid AS guid, m.text AS text,
       hex(m.attributedBody) AS attributed_body_hex,
       m.is_from_me AS is_from_me,
       (m.date / 1000000000 + 978307200) AS unix_seconds,
       h.id AS handle_id,
       c.chat_identifier AS chat_identifier,
       c.display_name AS chat_display_name
FROM message m
LEFT JOIN handle h ON h.ROWID = m.handle_id
LEFT JOIN chat_message_join cmj ON cmj.message_id = m.ROWID
LEFT JOIN chat c ON c.ROWID = cmj.chat_id
`.trim()

const EXCLUDE_BALLOON_CLAUSE = "AND m.balloon_bundle_id IS NULL"

const APPLE_EPOCH_OFFSET_SECONDS = 978307200
const THIRTY_DAYS_SECONDS = 2592000
const NANOS_PER_SECOND = 1000000000
const RECENCY_CLAUSE = `AND m.date >= (strftime('%s','now') - ${APPLE_EPOCH_OFFSET_SECONDS} - ${THIRTY_DAYS_SECONDS}) * ${NANOS_PER_SECOND}`

const RECIPIENT_CLAUSE = "AND m.destination_caller_id IN ('+16085122510', 'tel:+16085122510')"

const ITEM_TYPE_CLAUSE = "AND m.item_type = 0"

const EXCLUDE_SELF_SENDER_CLAUSE =
  "AND m.handle_id NOT IN (SELECT ROWID FROM handle WHERE id IN ('+16085122510', 'tel:+16085122510'))"

const UNREAD_PREDICATE_CLAUSES: readonly string[] = [
  "AND m.is_read = 0",
  "AND m.is_from_me = 0",
  EXCLUDE_BALLOON_CLAUSE,
  ITEM_TYPE_CLAUSE,
  RECENCY_CLAUSE,
  RECIPIENT_CLAUSE,
  EXCLUDE_SELF_SENDER_CLAUSE,
]

function chatFilterClause(handleRowids: readonly number[] | undefined): string {
  if (handleRowids === undefined) return ""
  const ids = handleRowids.map((id) => String(id)).join(", ")
  return `AND cmj.chat_id IN (SELECT chat_id FROM chat_handle_join WHERE handle_id IN (${ids}))`
}

export function buildRecentSql(opts: {
  readonly limit: number
  readonly handleRowids?: readonly number[]
}): string {
  return [
    MESSAGE_SELECT,
    "WHERE 1 = 1",
    EXCLUDE_BALLOON_CLAUSE,
    chatFilterClause(opts.handleRowids),
    "ORDER BY m.date DESC",
    `LIMIT ${opts.limit}`,
  ]
    .filter((line) => line.length > 0)
    .join("\n")
}

export function buildSearchSql(opts: {
  readonly query: string
  readonly limit: number
  readonly handleRowids?: readonly number[]
}): string {
  const pattern = `%${escapeSqlString(escapeLikePattern(opts.query))}%`
  const needle = escapeSqlString(opts.query)
  return [
    MESSAGE_SELECT,
    "WHERE 1 = 1",
    EXCLUDE_BALLOON_CLAUSE,
    chatFilterClause(opts.handleRowids),
    `AND (m.text LIKE '${pattern}' ESCAPE '\\' OR instr(m.attributedBody, CAST('${needle}' AS BLOB)) > 0)`,
    "ORDER BY m.date DESC",
    `LIMIT ${opts.limit}`,
  ]
    .filter((line) => line.length > 0)
    .join("\n")
}

export function buildHandlesSql(): string {
  return "SELECT ROWID AS rowid, id FROM handle"
}

export function buildCountUnreadSql(): string {
  return [
    "SELECT count(*) AS unread",
    "FROM message m",
    "WHERE 1 = 1",
    ...UNREAD_PREDICATE_CLAUSES,
  ].join("\n")
}

export function buildUnreadListSql(opts?: {
  readonly limit?: number
  readonly handleRowids?: readonly number[]
}): string {
  return [
    MESSAGE_SELECT,
    "WHERE 1 = 1",
    ...UNREAD_PREDICATE_CLAUSES,
    chatFilterClause(opts?.handleRowids),
    "ORDER BY m.date DESC",
    ...(opts?.limit === undefined ? [] : [`LIMIT ${opts.limit}`]),
  ]
    .filter((line) => line.length > 0)
    .join("\n")
}

export function buildChatDbScript(sql: string): string {
  const b64 = Buffer.from(sql, "utf8").toString("base64")
  return [
    `set -euo pipefail`,
    `sql="$(printf %s '${b64}' | base64 -D 2>/dev/null || printf %s '${b64}' | base64 -d)"`,
    `/usr/bin/sqlite3 -json "$HOME/Library/Messages/chat.db" "$sql"`,
  ].join("\n")
}

function parseJsonRows<T>(stdout: string, schema: z.ZodType<readonly T[]>): readonly T[] {
  const body = stdout.trim()
  if (body.length === 0) return []
  return schema.parse(JSON.parse(body))
}

function toMessage(row: z.infer<typeof messageRowSchema>): ImessageMessage {
  const text =
    row.text ??
    (row.attributed_body_hex === null
      ? undefined
      : decodeAttributedBody(row.attributed_body_hex)) ??
    ""
  return {
    rowid: row.rowid,
    guid: row.guid,
    text,
    isFromMe: row.is_from_me !== 0,
    unixSeconds: row.unix_seconds,
    handleId: row.handle_id,
    chatIdentifier: row.chat_identifier,
    chatDisplayName: row.chat_display_name === "" ? null : row.chat_display_name,
  }
}

export function parseMessageRows(stdout: string): readonly ImessageMessage[] {
  const seen = new Set<number>()
  const messages: ImessageMessage[] = []
  for (const row of parseJsonRows(stdout, messageRowsSchema)) {
    if (seen.has(row.rowid)) continue
    seen.add(row.rowid)
    messages.push(toMessage(row))
  }
  return messages
}

export function parseHandleRows(stdout: string): readonly ImessageHandle[] {
  return parseJsonRows(stdout, handleRowsSchema)
}

export function parseUnreadCount(stdout: string): number {
  const rows = parseJsonRows(stdout, unreadCountRowsSchema)
  return rows[0]?.unread ?? 0
}

export function formatLocalMinute(unixSeconds: number): string {
  const d = new Date(unixSeconds * 1000)
  return `${d.getFullYear()}-${padTwo(d.getMonth() + 1)}-${padTwo(d.getDate())}T${padTwo(d.getHours())}:${padTwo(d.getMinutes())}`
}

export function messageLabel(msg: ImessageMessage, nameByKey: ReadonlyMap<string, string>): string {
  const id = msg.handleId ?? msg.chatIdentifier
  const base = id === null || id === "" ? "unknown" : (nameByKey.get(handleKey(id)) ?? id)
  return msg.chatDisplayName === null ? base : `${msg.chatDisplayName}: ${base}`
}

export function singleLine(text: string): string {
  return text.replaceAll("\t", " ").replaceAll(/\s*\n\s*/g, " ⏎ ")
}
