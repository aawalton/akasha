import type { ReadonlyJSONValue } from "@akasha/pages-core/schema/pages"

export interface PageRow {
  readonly _id: string
  readonly [key: string]: ReadonlyJSONValue
}
