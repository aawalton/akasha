import type { Page } from "../page.page-type.types.ts"
import type { AsksOfSlug } from "./properties/asks-of-slug.text-property.ts"
import type { CountBy } from "./properties/count-by.text-property.ts"
import type { Descending } from "./properties/descending.boolean-property.ts"
import type { Keys } from "./properties/keys.text-property.ts"
import type { Limit } from "./properties/limit.number-property.ts"
import type { Narrows } from "./properties/narrows.record-property.ts"
import type { Offset } from "./properties/offset.number-property.ts"
import type { Parameters } from "./properties/parameters.record-property.ts"
import type { Reduction } from "./properties/reduction.text-property.ts"
import type { SortBy } from "./properties/sort-by.text-property.ts"
import type { TargetKey } from "./properties/target-key.text-property.ts"

export type PageQuery = Page & {
  asksOfSlug: AsksOfSlug
  parameters?: Parameters
  narrows?: Narrows
  countBy?: CountBy
  reduction?: Reduction
  targetKey?: TargetKey
  keys?: Keys
  sortBy?: SortBy
  descending?: Descending
  limit?: Limit
  offset?: Offset
}
