import type { SequenceDirection } from "akasha/pages/types/properties/sequence-direction.text-property.types.ts"
import type { SequenceGroupBy } from "akasha/pages/types/properties/sequence-group-by.text-property.types.ts"
import type { SequenceOrderBy } from "akasha/pages/types/properties/sequence-order-by.text-property.types.ts"

export type Sequence = {
  groupBy: SequenceGroupBy
  orderBy: SequenceOrderBy
  direction?: SequenceDirection
}
