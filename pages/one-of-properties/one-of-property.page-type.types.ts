import type { Members } from "akasha/pages/one-of-properties/properties/members.relation-property.types.ts"
import type { PageProperty } from "akasha/pages/types/page-properties/page-property.page-type.types.ts"

export type OneOfProperty = PageProperty & {
  members: Members
}
