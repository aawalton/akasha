import type { AttributeValue } from "akasha/graph/predicate/properties/attribute-value.text-property.types.ts"
import type { FollowedAttribute } from "akasha/graph/predicate/properties/followed-attribute.relation-property.types.ts"
import type { List } from "akasha/page/type/page-property/page-property.page-type.ts"

export type Follows = List<{
  attribute: FollowedAttribute
  value: AttributeValue
}>
