import type { Domain } from "akasha/domains/domain.page-type.types.ts"
import type { ListMembers } from "akasha/domains/lists/properties/list-members.record-property.ts"

export type List = Domain & {
  members: ListMembers
}
