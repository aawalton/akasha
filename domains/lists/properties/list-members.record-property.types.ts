import type { MemberName } from "akasha/domains/lists/properties/member-name.text-property.types.ts"
import type { Definition } from "akasha/domains/properties/definition.standard-agent-english-property.types.ts"
import type { List } from "akasha/pages/types/page-properties/page-property.page-type.ts"

export type ListMembers = List<{
  memberName: MemberName
  definition: Definition
}>
