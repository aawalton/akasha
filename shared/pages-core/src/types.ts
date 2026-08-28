import type { ReadonlyJSONValue } from "./schema/pages.ts"
import type { ColorRule } from "./schema/color-rule.ts"

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
