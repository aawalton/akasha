import { asPage, type Page } from "@akasha/pages-core/page-types"
import { JsonSchema } from "@akasha/utils-narrow/json-schema"
import type { Json } from "@akasha/utils-narrow/json-value"
import { z } from "zod"

export const PAGE_WRITE_PATH = "/api/page-write"

export const WRITE_OVER_SERVER_OPS = [
  "createPage",
  "createPageIfAbsent",
  "patchPage",
  "patchPages",
  "patchPageById",
  "upsertPage",
  "upsertPages",
  "deletePage",
  "deletePages",
  "deletePageById",
  "deletePageByIds",
  "bulkUpsertPages",
] as const

export type WriteOverServerOp = (typeof WRITE_OVER_SERVER_OPS)[number]

const WRITE_OVER_SERVER_OP_NAMES: ReadonlySet<string> = new Set(WRITE_OVER_SERVER_OPS)

export function isWriteOverServerOp(one: unknown): one is WriteOverServerOp {
  return typeof one === "string" && WRITE_OVER_SERVER_OP_NAMES.has(one)
}

export class ServerWriteError extends Error {
  readonly op: string
  readonly status: number | null
  constructor(op: string, status: number | null, message: string) {
    super(message)
    this.name = "ServerWriteError"
    this.op = op
    this.status = status
  }
}

function statesAnOrigin(host: unknown): host is { readonly location: { readonly origin: string } } {
  if (typeof host !== "object" || host === null || !("location" in host)) return false
  const held = host.location
  if (typeof held !== "object" || held === null || !("origin" in held)) return false
  return typeof held.origin === "string" && held.origin !== ""
}

export function writesOverServer(): boolean {
  return statesAnOrigin(globalThis)
}

const SERVER_REPLY = z.looseObject({
  error: z.string().optional(),
  result: JsonSchema.optional(),
})

type ServerReply = { readonly error?: string; readonly result?: Json }

export function asPageList(value: unknown): readonly Page[] {
  if (!Array.isArray(value)) return []
  return value.map((row) => asPage(row))
}

export async function overServer(op: WriteOverServerOp, args: unknown): Promise<Json> {
  let response: Response
  try {
    response = await fetch(PAGE_WRITE_PATH, {
      method: "POST",
      headers: { accept: "application/json", "content-type": "application/json" },
      body: JSON.stringify({ op, args }),
    })
  } catch (cause) {
    throw new ServerWriteError(
      op,
      null,
      `${op}: this page type's pages are files, and ${PAGE_WRITE_PATH} gave no answer, so the write did not land (${String(cause)})`
    )
  }
  let body: unknown
  try {
    body = await response.json()
  } catch (cause) {
    throw new ServerWriteError(
      op,
      response.status,
      `${op}: ${PAGE_WRITE_PATH} replied ${response.status} with what is not JSON (${String(cause)})`
    )
  }
  const read = SERVER_REPLY.safeParse(body)
  const held: ServerReply = read.success ? read.data : {}
  if (!response.ok) {
    const why = held.error ?? `${response.status}`
    throw new ServerWriteError(op, response.status, `${op}: the write was refused — ${why}`)
  }
  return held.result ?? null
}
