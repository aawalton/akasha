"use client"

import { type AutomationIndex, makeAutomationIndex } from "@automation/core/index/automation-index"
import { type PlannedEffect, planActionsForEvent } from "@automation/core/plan"
import { parsePageAsAutomation } from "@automation/core/pure/parse-automation"
import type { EmittedEvent, EvaluationContext } from "@automation/core/pure/types"
import { flattenRow } from "@shared/pages-access/routing-core"
import type { PageRow } from "@shared/pages-ui-store/collection/page-row"
import type { PagesStore } from "@shared/pages-ui-store/collection/store"
import type { Json } from "../../../supabase-database/src/generated/database"
import { assertNever } from "../../../utils-narrow/src/assert-never"

type PagesCollection = PagesStore["collection"]

export const AUTOMATION_PAGE_TYPE_SLUG = "automation"

function asJson(value: unknown): Json {
  return value as Json
}

export function loadAutomationIndex(collection: PagesCollection): AutomationIndex {
  const index = makeAutomationIndex()
  const parsed = collection.toArray
    .filter((row: PageRow) => row.page_type_slug === AUTOMATION_PAGE_TYPE_SLUG)
    .map((row: PageRow) => parsePageAsAutomation(flattenRow(row)))
    .filter((row): row is NonNullable<typeof row> => row !== null)
  index.rebuild(parsed)
  return index
}

export interface ComputeOptimisticAutomationSetArgs {
  readonly pageTypeSlug: string
  readonly rowId: string
  readonly userPatch: Readonly<Record<string, Json>>
  readonly currentRow: Readonly<Record<string, Json>>
  readonly automationIndex: AutomationIndex
}

export interface OptimisticAutomationPrediction {
  readonly set: Readonly<Record<string, Json>>
  readonly softDeleteSource: boolean
}

export function computeOptimisticAutomationSet(
  args: ComputeOptimisticAutomationSetArgs
): OptimisticAutomationPrediction | null {
  const { pageTypeSlug, rowId, userPatch, currentRow, automationIndex } = args
  const automations = automationIndex.forPageType(pageTypeSlug)
  if (automations.length === 0) return null

  const event: EmittedEvent = {
    type: "updated",
    rowId,
    pageTypeSlug,
    patch: { ...userPatch },
    oldValues: { ...currentRow },
  }
  const ctx: EvaluationContext = {
    source: {
      ...currentRow,
      ...userPatch,
      id: rowId,
      pageTypeSlug,
      previous: { ...currentRow },
    },
  }

  const effects = planActionsForEvent(automations, event, ctx)
  const { set, softDeleteSource } = foldSourceEffects(effects, rowId)
  return Object.keys(set).length === 0 && !softDeleteSource ? null : { set, softDeleteSource }
}

function foldSourceEffects(
  effects: readonly PlannedEffect[],
  sourceRowId: string
): { readonly set: Record<string, Json>; readonly softDeleteSource: boolean } {
  const set: Record<string, Json> = {}
  let softDeleteSource = false
  for (const effect of effects) {
    switch (effect.kind) {
      case "patch_source":
        if (effect.rowId === sourceRowId) {
          for (const [key, value] of Object.entries(effect.set)) {
            set[key] = asJson(value)
          }
        }
        break
      case "delete_source":
        if (effect.rowId === sourceRowId) softDeleteSource = true
        break
      case "patch_relation":
      case "undelete_relation":
      case "create_page":
      case "patch_referrers":
      case "patch_matching":
      case "notify":
      case "noop":
      case "condition_rejected":
      case "no_target":
        break
      default:
        assertNever(effect)
    }
  }
  return { set, softDeleteSource }
}
