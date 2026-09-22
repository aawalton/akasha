import type { Members } from "akasha/page/one-of-property/properties/members.multi-relation-property.types.ts"
import type { PageProperty } from "akasha/page/type/page-property/page-property.page-type.types.ts"

export type OneOfProperty = PageProperty & {
  members: Members
}
