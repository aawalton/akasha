import type { PageProperty } from "../types/page-properties/page-property.page-type.ts"
import type { Members } from "./properties/members.relation-property.ts"

export type OneOfProperty = PageProperty & {
  members: Members
}
