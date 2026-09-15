import type { MemberName } from "akasha/domain/list/properties/member-name.text-property.types.ts"
import type { Definition } from "akasha/domain/properties/definition.standard-agent-english-property.types.ts"
import type { List } from "akasha/page/type/page-property/page-property.page-type.ts"

export type ListMembers = List<{
  memberName: MemberName
  definition: Definition
}>
