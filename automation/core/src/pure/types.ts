import type { PageWhere } from "@shared/pages-core/page-types"
import type { ReadonlyJSONValue } from "@shared/pages-core/schema/pages"

export type ValueExpr = ReadonlyJSONValue

export type EmittedEvent = (
  | {
      readonly type: "created"
      readonly rowId: string
      readonly pageTypeSlug: string
      readonly fields: Record<string, unknown>
    }
  | {
      readonly type: "updated"
      readonly rowId: string
      readonly pageTypeSlug: string
      readonly patch: Record<string, unknown>
      readonly oldValues: Record<string, unknown>
    }
  | {
      readonly type: "deleted"
      readonly rowId: string
      readonly pageTypeSlug: string
      readonly oldValues: Record<string, unknown>
    }
) & {
  readonly actor?: string
}

export type Matcher =
  | { readonly kind: "is_empty" }
  | { readonly kind: "is_not_empty" }
  | { readonly kind: "equals"; readonly value: ReadonlyJSONValue }
  | { readonly kind: "not_equals"; readonly value: ReadonlyJSONValue }
  | { readonly kind: "truthy" }
  | { readonly kind: "falsy" }

export type Trigger =
  | {
      readonly kind: "property_changed_to"
      readonly propertyIds: readonly string[]
      readonly to: Matcher
      readonly from?: Matcher
    }
  | {
      readonly kind: "property_changed_to"
      readonly propertyId: string
      readonly to: Matcher
      readonly from?: Matcher
    }
  | {
      readonly kind: "created"
      readonly propertyIds: readonly string[]
      readonly to: Matcher
    }
  | {
      readonly kind: "created"
      readonly propertyId: string
      readonly to: Matcher
    }
  | {
      readonly kind: "invoked"
      readonly propertyIds: readonly string[]
    }
  | {
      readonly kind: "schedule"
      readonly rrule: string
      readonly resetDomain: "eso-na" | "us-mountain"
      readonly activityConditions?: readonly string[]
    }

export type Action =
  | {
      readonly kind: "create_page"
      readonly pageTypeSlug: string
      readonly properties: Readonly<Record<string, ValueExpr>>
      readonly condition?: ValueExpr
    }
  | {
      readonly kind: "patch_source"
      readonly set: Readonly<Record<string, ValueExpr>>
      readonly condition?: ValueExpr
    }
  | {
      readonly kind: "patch_relation"
      readonly relationPropertyId: string
      readonly pageTypeSlug: string
      readonly set: Readonly<Record<string, ValueExpr>>
      readonly condition?: ValueExpr
    }
  | {
      readonly kind: "patch_referrers"
      readonly referrerPageTypeSlug: string
      readonly viaRelationPropertyId: string
      readonly viaRelationCardinality: "single" | "multi"
      readonly where?: PageWhere
      readonly set: Readonly<Record<string, ValueExpr>>
      readonly condition?: ValueExpr
    }
  | {
      readonly kind: "patch_matching"
      readonly pageTypeSlug: string
      readonly where: PageWhere
      readonly set: Readonly<Record<string, ValueExpr>>
      readonly condition?: ValueExpr
    }
  | {
      readonly kind: "undelete_relation"
      readonly relationPropertyId: string
      readonly pageTypeSlug: string
      readonly condition?: ValueExpr
    }
  | {
      readonly kind: "delete_source"
      readonly condition?: ValueExpr
    }
  | {
      readonly kind: "notify"
      readonly userId: ValueExpr
      readonly title: ValueExpr
      readonly body?: ValueExpr
      readonly link?: ValueExpr
      readonly notifyKind?: ValueExpr
      readonly notifySource?: ValueExpr
      readonly condition?: ValueExpr
    }

export interface AutomationRow {
  readonly id: string
  readonly name: string
  readonly enabled: true
  readonly triggerPageTypeSlug: string | null
  readonly trigger: Trigger
  readonly actions: readonly Action[]
}

export interface EvaluationContext {
  readonly source: Readonly<Record<string, ReadonlyJSONValue>> & {
    readonly previous: Readonly<Record<string, ReadonlyJSONValue>>
  }
  readonly referrer?: Readonly<Record<string, ReadonlyJSONValue>>
  readonly match?: Readonly<Record<string, ReadonlyJSONValue>>
}

export interface RelationPropertyDef {
  readonly ownerPageTypeSlug: string
  readonly stringId: string
}

export type RelationCache = Readonly<
  Record<string, Readonly<Record<string, ReadonlyJSONValue>> | null>
>
