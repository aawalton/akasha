import type { Json } from "../../supabase-database/src/generated/database"
import type { StorageTier } from "@shared/pages-core/types"

export interface RelationTarget {
  readonly target: string
  readonly back: string
}

export interface PropSpec {
  readonly stringId: string
  readonly title: string
  readonly type: string
  readonly options?: readonly string[]
  readonly relation?: RelationTarget
  readonly config?: Readonly<Record<string, Json>>
  readonly colorRules?: Json
  readonly storage?: StorageTier
}
