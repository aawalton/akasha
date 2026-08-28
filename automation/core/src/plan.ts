import type { ReadonlyJSONValue } from "@shared/pages-core/schema/pages"
import { assertNever } from "@shared/utils-narrow"
import { isPatchNoop } from "./actions/page-equality"
import { buildFormulaValues } from "./pure/build-formula-values"
import { evaluateTrigger } from "./pure/trigger-evaluate"
import type {
  Action,
  AutomationRow,
  EmittedEvent,
  EvaluationContext,
  RelationCache,
  ValueExpr,
} from "./pure/types"
import { resolveRecord, resolveValueExpr } from "./pure/value-resolve"

export interface PlannedPatch {
  readonly rowId: string
  readonly pageTypeSlug: string
  readonly set: Readonly<Record<string, ReadonlyJSONValue>>
}

export type PlannedEffect =
  | ({ readonly kind: "patch_source" } & PlannedPatch)
  | ({ readonly kind: "patch_relation" } & PlannedPatch)
  | ({ readonly kind: "undelete_relation" } & PlannedPatch)
  | {
      readonly kind: "delete_source"
      readonly rowId: string
      readonly pageTypeSlug: string
    }
  | {
      readonly kind: "create_page"
      readonly optimistic: false
      readonly pageTypeSlug: string
      readonly properties: Readonly<Record<string, ReadonlyJSONValue>>
    }
  | {
      readonly kind: "patch_referrers"
      readonly optimistic: false
      readonly referrerPageTypeSlug: string
      readonly viaRelationPropertyId: string
    }
  | {
      readonly kind: "patch_matching"
      readonly optimistic: false
      readonly pageTypeSlug: string
    }
  | {
      readonly kind: "notify"
      readonly optimistic: false
      readonly userId: ReadonlyJSONValue
      readonly title: ReadonlyJSONValue
      readonly body: ReadonlyJSONValue
      readonly link: ReadonlyJSONValue
      readonly notifyKind: ReadonlyJSONValue
      readonly notifySource: ReadonlyJSONValue
    }
  | { readonly kind: "noop" }
  | { readonly kind: "condition_rejected" }
  | { readonly kind: "no_target" }

export interface PlanActionContext {
  readonly relationCache?: RelationCache
  readonly targetRow?: Readonly<Record<string, unknown>>
}

export interface PlanOptions {
  readonly contextForAction?: (
    automation: AutomationRow,
    action: Action,
    actionIndex: number
  ) => PlanActionContext
}

function conditionPasses(
  condition: ReadonlyJSONValue | undefined,
  ctx: EvaluationContext,
  formulaValues: { readonly source: Readonly<Record<string, ReadonlyJSONValue>> }
): boolean {
  if (condition === undefined) return true
  const cond = resolveValueExpr(condition, ctx, formulaValues)
  return !(cond === null || cond === false || cond === 0 || cond === "")
}

export function planAction(
  action: Action,
  ctx: EvaluationContext,
  actionCtx: PlanActionContext = {}
): PlannedEffect {
  const relationCache = actionCtx.relationCache ?? {}
  const formulaValues = buildFormulaValues(ctx, relationCache)

  switch (action.kind) {
    case "create_page": {
      if (!conditionPasses(action.condition, ctx, formulaValues)) {
        return { kind: "condition_rejected" }
      }
      const properties = resolveRecord(action.properties, ctx, formulaValues)
      return {
        kind: "create_page",
        optimistic: false,
        pageTypeSlug: action.pageTypeSlug,
        properties,
      }
    }
    case "patch_source": {
      if (!conditionPasses(action.condition, ctx, formulaValues)) {
        return { kind: "condition_rejected" }
      }
      const resolved = resolveRecord(action.set, ctx, formulaValues)
      const sourceId = ctx.source.id
      const sourcePageTypeSlug = ctx.source.pageTypeSlug
      if (typeof sourceId !== "string" || typeof sourcePageTypeSlug !== "string") {
        return { kind: "no_target" }
      }
      if (isPatchNoop(ctx.source, resolved)) return { kind: "noop" }
      return {
        kind: "patch_source",
        rowId: sourceId,
        pageTypeSlug: sourcePageTypeSlug,
        set: resolved,
      }
    }
    case "patch_relation": {
      if (!conditionPasses(action.condition, ctx, formulaValues)) {
        return { kind: "condition_rejected" }
      }
      const targetId = ctx.source[action.relationPropertyId]
      if (typeof targetId !== "string" || targetId.length === 0) {
        return { kind: "no_target" }
      }
      const resolved = resolveRecord(action.set, ctx, formulaValues)
      if (actionCtx.targetRow !== undefined && isPatchNoop(actionCtx.targetRow, resolved)) {
        return { kind: "noop" }
      }
      return {
        kind: "patch_relation",
        rowId: targetId,
        pageTypeSlug: action.pageTypeSlug,
        set: resolved,
      }
    }
    case "patch_referrers": {
      return {
        kind: "patch_referrers",
        optimistic: false,
        referrerPageTypeSlug: action.referrerPageTypeSlug,
        viaRelationPropertyId: action.viaRelationPropertyId,
      }
    }
    case "patch_matching": {
      return {
        kind: "patch_matching",
        optimistic: false,
        pageTypeSlug: action.pageTypeSlug,
      }
    }
    case "undelete_relation": {
      if (!conditionPasses(action.condition, ctx, formulaValues)) {
        return { kind: "condition_rejected" }
      }
      const targetId = ctx.source[action.relationPropertyId]
      if (typeof targetId !== "string" || targetId.length === 0) {
        return { kind: "no_target" }
      }
      return {
        kind: "undelete_relation",
        rowId: targetId,
        pageTypeSlug: action.pageTypeSlug,
        set: {},
      }
    }
    case "delete_source": {
      if (!conditionPasses(action.condition, ctx, formulaValues)) {
        return { kind: "condition_rejected" }
      }
      const sourceId = ctx.source.id
      const sourcePageTypeSlug = ctx.source.pageTypeSlug
      if (typeof sourceId !== "string" || typeof sourcePageTypeSlug !== "string") {
        return { kind: "no_target" }
      }
      return {
        kind: "delete_source",
        rowId: sourceId,
        pageTypeSlug: sourcePageTypeSlug,
      }
    }
    case "notify": {
      if (!conditionPasses(action.condition, ctx, formulaValues)) {
        return { kind: "condition_rejected" }
      }
      const resolveOpt = (expr: ValueExpr | undefined): ReadonlyJSONValue =>
        expr === undefined ? null : resolveValueExpr(expr, ctx, formulaValues)
      return {
        kind: "notify",
        optimistic: false,
        userId: resolveValueExpr(action.userId, ctx, formulaValues),
        title: resolveValueExpr(action.title, ctx, formulaValues),
        body: resolveOpt(action.body),
        link: resolveOpt(action.link),
        notifyKind: resolveOpt(action.notifyKind),
        notifySource: resolveOpt(action.notifySource),
      }
    }
    default:
      return assertNever(action)
  }
}

export function planActionsForEvent(
  automations: readonly AutomationRow[],
  event: EmittedEvent,
  ctx: EvaluationContext,
  opts: PlanOptions = {}
): readonly PlannedEffect[] {
  const out: PlannedEffect[] = []
  for (const automation of automations) {
    if (!evaluateTrigger(automation.trigger, event)) continue
    automation.actions.forEach((action, actionIndex) => {
      const actionCtx = opts.contextForAction?.(automation, action, actionIndex) ?? {}
      out.push(planAction(action, ctx, actionCtx))
    })
  }
  return out
}
