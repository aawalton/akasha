import type { ChildRelation } from "akasha/page/type/properties/child-relation.text-property.types.ts"
import type { ChildType } from "akasha/page/type/properties/child-type.relation-property.types.ts"

export type ChildCollection = {
  childType: ChildType
  childRelation: ChildRelation
}
