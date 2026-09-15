import type { Domain } from "akasha/domain/domain.page-type.types.ts"
import type { ListMembers } from "akasha/domain/list/properties/list-members.record-property.types.ts"

export type List = Domain & {
  members: ListMembers
}
