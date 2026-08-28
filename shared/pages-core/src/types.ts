
import type { ReadonlyJSONValue } from "./schema/pages"
import type { ColorRule } from "./schema/color-rule"

export type PropertyType =
  | "text"
  | "markdown"
  | "number"
  | "select"
  | "multi-select"
  | "path-select"
  | "calendar-date"
  | "calendar-time"
  | "instant"
  | "boolean"
  | "url"
  | "relation"
  | "multi-relation"
  | "rollup"
  | "aggregate"
  | "formula"
  | "json"
  | "rrule"
  | "progress"
  | "rich-document"
  | "action-button"

/**
 * Where a property's value is kept.
 *
 * ONE DECLARATION. This tuple is the only statement of the tier vocabulary. The Zod enums that
 * admit a tier and the fields that carry one read it rather than restating it, so a tier added
 * here reaches every one of them at once.
 */
export const STORAGE_TIERS = ["indexed", "content", "external"] as const

export type StorageTier = (typeof STORAGE_TIERS)[number]

export type PropertyDefinition = {
  readonly id: string
  readonly title: string
  readonly type: PropertyType
  readonly config?: Readonly<Record<string, ReadonlyJSONValue>>
  readonly schema?: Readonly<Record<string, ReadonlyJSONValue>>
  readonly pageId?: string
  readonly accent?: boolean
  readonly display?: "badge" | "inline"
  readonly sort?: "alpha" | "manual"
  readonly storage?: StorageTier
  readonly groupable?: boolean
  readonly versionExempt?: boolean
  readonly columnName?: string
  readonly indexName?: string
  readonly skipRelationMirroring?: boolean
  readonly isRequired?: boolean
  readonly unique?: boolean
  readonly parent?: boolean
  readonly colorRules?: readonly ColorRule[]
  readonly defaultValue?: ReadonlyJSONValue
}

export type PageDataJSON = Readonly<Record<string, ReadonlyJSONValue | undefined>>
