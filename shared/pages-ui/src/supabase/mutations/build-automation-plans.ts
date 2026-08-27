"use client"

import { type PagesMutationPlan, type RowOverlay } from "@shared/pages-ui-store/optimistic/plan"
import { getPagesStore } from "@shared/pages-ui-store/singleton"
import type { Json } from "../../../../supabase-database/src/generated/database"
import { computeOptimisticAutomationSet, loadAutomationIndex } from "../optimistic-automations"
import { buildOverlay, buildPatchPlan } from "./build-patch-plan"
import { readCurrentAttributes } from "./collection-lookup"

function asJsonRecord(value: Record<string, unknown> | undefined): Record<string, Json> {
  const out: Record<string, Json> = {}
  if (value === undefined) return out
  for (const [k, v] of Object.entries(value)) out[k] = asJson(v)
  return out
}

export async function buildAutomationPlans(args: {
  readonly ids: readonly string[]
  readonly pageTypeSlug: string
  readonly userSet: Record<string, unknown> | undefined
  readonly baseOverlay: RowOverlay
}): Promise<readonly PagesMutationPlan[]> {
  const { ids, pageTypeSlug, userSet, baseOverlay } = args
  const userPatch = asJsonRecord(userSet)

  const basePlans = (): readonly PagesMutationPlan[] =>
    ids.map((id) => ({ kind: "patch", rowId: id, overlay: baseOverlay }))

  if (Object.keys(userPatch).length === 0) return basePlans()

  const store = await getPagesStore()
  const collection = store.collection
  const automationIndex = loadAutomationIndex(collection)
  if (automationIndex.forPageType(pageTypeSlug).length === 0) {
    return basePlans()
  }

  const plans: PagesMutationPlan[] = []
  for (const id of ids) {
    const currentRow = readCurrentAttributes(collection, id)
    const prediction =
      currentRow === null
        ? null
        : computeOptimisticAutomationSet({
            pageTypeSlug,
            rowId: id,
            userPatch,
            currentRow,
            automationIndex,
          })
    if (prediction === null) {
      plans.push({ kind: "patch", rowId: id, overlay: baseOverlay })
      continue
    }
    if (prediction.softDeleteSource) {
      plans.push({ kind: "hard-delete", rowId: id })
      continue
    }
    const merged: Record<string, Json> = { ...userPatch, ...prediction.set }
    const split = buildPatchPlan({ set: merged })
    const overlay = buildOverlay(split)
    const predictedSet: Record<string, Json> = {}
    for (const [k, v] of Object.entries(split.patchAttributes)) predictedSet[k] = asJson(v)
    plans.push({ kind: "patch", rowId: id, overlay, predictedSet })
  }
  return plans
}

function asJson(value: unknown): Json {
  return value as Json
}
