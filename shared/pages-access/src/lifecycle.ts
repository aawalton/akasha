import { computeRescheduleDate, decideCompletion, SNAPSHOT_SLUG_BY_TASK_SLUG } from "@shared/pages-core/task-lifecycle"
import { requireFirst } from "../../utils-narrow/src/require-first"
import { softDeletePageById } from "./delete"
import { getPage, getPages } from "./get"
import { patchPageById } from "./patch"
import type { Page } from "@shared/pages-core/page-types"

function requireSlug(row: Page, op: string): string {
  const slug = row.pageTypeSlug
  if (typeof slug !== "string") {
    throw new Error(`${op}: page ${String(row.id)} has no pageTypeSlug`)
  }
  return slug
}

export interface CompletePageResult {
  readonly id: string
  readonly status: "completed" | "already-completed"
  readonly recurring: boolean
  readonly softDeleted: boolean
  readonly completedAt: number | null
}

export async function completePage(args: {
  id: string
  nowMs?: number
}): Promise<CompletePageResult> {
  const nowMs = args.nowMs ?? Date.now()
  const existing = await getPage({
    where: [{ key: "id", eq: args.id }],
    select: ["id", "pageTypeSlug", "rrule", "completedAt"],
  })
  if (existing === null) throw new Error(`completePage: page not found: ${args.id}`)
  const pageTypeSlug = requireSlug(existing, "completePage")

  if (existing.completedAt != null) {
    return {
      id: args.id,
      status: "already-completed",
      recurring: false,
      softDeleted: false,
      completedAt: null,
    }
  }

  const decision = decideCompletion({ rrule: existing.rrule, completedAtMs: nowMs })
  await patchPageById({
    pageTypeSlug,
    id: args.id,
    set: { completedAt: new Date(nowMs).toISOString() },
  })
  if (decision.softDeleteSource) {
    await softDeletePageById({ pageTypeSlug, id: args.id })
  }
  return {
    id: args.id,
    status: "completed",
    recurring: !decision.softDeleteSource,
    softDeleted: decision.softDeleteSource,
    completedAt: nowMs,
  }
}

export interface UncompletePageResult {
  readonly id: string
  readonly status: "uncompleted" | "no-completion"
  readonly snapshotId: string | null
}

export async function uncompletePage(args: { id: string }): Promise<UncompletePageResult> {
  const existing = await getPage({
    where: [{ key: "id", eq: args.id }],
    select: ["id", "pageTypeSlug"],
  })
  if (existing === null) throw new Error(`uncompletePage: page not found: ${args.id}`)
  const pageTypeSlug = requireSlug(existing, "uncompletePage")
  const snapshotSlug = SNAPSHOT_SLUG_BY_TASK_SLUG[pageTypeSlug]
  if (snapshotSlug === undefined) {
    throw new Error(`uncompletePage: ${pageTypeSlug} is not a completable task type`)
  }

  const { rows } = await getPages({
    pageTypeSlug: snapshotSlug,
    where: [{ key: "taskPageId", eq: args.id }],
    order: [{ by: "completedAt", dir: "desc" }],
    select: ["id"],
    limit: 1,
  })
  if (rows.length === 0) return { id: args.id, status: "no-completion", snapshotId: null }

  const snapshotId = String(requireFirst(rows, "uncompletePage snapshot").id)
  await softDeletePageById({ pageTypeSlug: snapshotSlug, id: snapshotId })
  return { id: args.id, status: "uncompleted", snapshotId }
}

export interface ReschedulePageResult {
  readonly id: string
  readonly dueDate: string
}

export async function reschedulePage(args: {
  id: string
  to?: string
  byDays?: number
  nowMs?: number
}): Promise<ReschedulePageResult> {
  const nowMs = args.nowMs ?? Date.now()
  const existing = await getPage({
    where: [{ key: "id", eq: args.id }],
    select: ["id", "pageTypeSlug"],
  })
  if (existing === null) throw new Error(`reschedulePage: page not found: ${args.id}`)
  const pageTypeSlug = requireSlug(existing, "reschedulePage")
  const dueDate = computeRescheduleDate({ to: args.to, byDays: args.byDays, nowMs })
  await patchPageById({ pageTypeSlug, id: args.id, set: { dueDate } })
  return { id: args.id, dueDate }
}
