import type { ReadonlyJSONValue } from "akasha/pages/core/schema/modules/pages/pages.module.code.ts"

export interface PageRow {
  readonly _id: string
  readonly [key: string]: ReadonlyJSONValue
}
