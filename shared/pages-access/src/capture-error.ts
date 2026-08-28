import { patchPage } from "@shared/pages-query"
import { askPage } from "@shared/pages-query/ask"
import { mintedId } from "./file-rows"
import { writerOf } from "./file-write"

export type ErrorCapturePayload = {
  fingerprint: string
  message: string
  stack: string
  kind: string
  app: string
  url: string
  userAgent: string
  releaseSha?: string
}

const ERROR_PAGE_TYPE = "error"

const TITLE_BOUND = 200

const FRESH = "new"
const REOPENED = "in-progress"
const FIX_DEPLOYED = "fix-deployed"

type Standing = Readonly<Record<string, unknown>> | null

async function standingPage(fingerprint: string): Promise<Standing> {
  const asked = await askPage(ERROR_PAGE_TYPE, fingerprint)
  if (asked.outcome === "found") return asked.page.values
  if (asked.outcome === "absent") return null
  throw new Error(
    `captureError: \`${fingerprint}\` went unread, so how many times it has broken this way is unknown and a write here would reset it — ${asked.why}`
  )
}

function countIn(standing: Standing): number {
  const held = standing?.count
  const tally = typeof held === "number" ? held : Number.parseInt(String(held ?? ""), 10)
  return Number.isFinite(tally) && tally > 0 ? tally : 0
}

function statusAfter(standing: Standing): string {
  const held = standing?.status
  if (typeof held !== "string" || held.trim() === "") return FRESH
  return held === FIX_DEPLOYED ? REOPENED : held
}

function idFor(standing: Standing): string {
  const held = standing?.id
  return typeof held === "string" && held.trim() !== "" ? held.trim() : mintedId()
}

export async function captureError(
  payload: ErrorCapturePayload,
  writer?: string
): Promise<{ id: string }> {
  const fingerprint = payload.fingerprint.trim()
  if (fingerprint === "") {
    throw new Error("captureError: a capture states a non-empty fingerprint, and this one does not")
  }

  const standing = await standingPage(fingerprint)
  const seenAt = new Date().toISOString()
  const id = idFor(standing)

  const values = {
    ...(standing === null ? { id, "first-seen-at": seenAt } : {}),
    title: payload.message.slice(0, TITLE_BOUND),
    app: payload.app,
    fingerprint,
    kind: payload.kind,
    message: payload.message,
    status: statusAfter(standing),
    url: payload.url,
    "user-agent": payload.userAgent,
    stack: payload.stack,
    count: countIn(standing) + 1,
    "last-seen-at": seenAt,
    ...(payload.releaseSha === undefined ? {} : { "release-sha": payload.releaseSha }),
  }

  const written = await patchPage(ERROR_PAGE_TYPE, fingerprint, values, writerOf(writer))
  if (!written.ok) throw new Error(`captureError: ${written.why}`)
  return { id }
}
