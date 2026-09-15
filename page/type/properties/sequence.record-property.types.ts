import type { SequenceDirection } from "akasha/page/type/properties/sequence-direction.text-property.types.ts"
import type { SequenceGroupBy } from "akasha/page/type/properties/sequence-group-by.text-property.types.ts"
import type { SequenceOrderBy } from "akasha/page/type/properties/sequence-order-by.text-property.types.ts"

export type Sequence = {
  groupBy: SequenceGroupBy
  orderBy: SequenceOrderBy
  direction?: SequenceDirection
}
