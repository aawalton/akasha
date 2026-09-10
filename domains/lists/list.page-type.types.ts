import type { Domain } from "../domain.page-type.ts"
import type { ListMembers } from "./properties/list-members.record-property.ts"

export type List = Domain & {
  members: ListMembers
}
