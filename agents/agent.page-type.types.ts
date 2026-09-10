import type { Page } from "../pages/page.page-type.types.ts"
import type { AssignmentSlug } from "../seat-system/seats/properties/assignment-slug.one-of-property.ts"
import type { PrincipalSeatName } from "../seat-system/seats/properties/principal-seat-name.relation-property.ts"
import type { Edits } from "./properties/edits.file-property.ts"
import type { Refusals } from "./properties/refusals.file-property.ts"

export type Agent = Page & {
  assignmentSlug: AssignmentSlug
  principalSeatName?: PrincipalSeatName
  edits?: Edits
  refusals?: Refusals
}
