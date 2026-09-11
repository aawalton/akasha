import type { ChildRelation } from "akasha/pages/types/properties/child-relation.text-property.types.ts"
import type { ChildType } from "akasha/pages/types/properties/child-type.relation-property.types.ts"

export type ChildCollection = {
  childType: ChildType
  childRelation: ChildRelation
}
