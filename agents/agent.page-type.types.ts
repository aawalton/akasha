import type { AuditRefusals } from "akasha/agents/properties/audit-refusals.file-property.types.ts"
import type { Edits } from "akasha/agents/properties/edits.file-property.types.ts"
import type { Refusals } from "akasha/agents/properties/refusals.file-property.types.ts"
import type { Page } from "akasha/pages/page.page-type.types.ts"
import type { AssignmentSlug } from "akasha/seat-system/seats/properties/assignment-slug.one-of-property.types.ts"
import type { PrincipalSeatName } from "akasha/seat-system/seats/properties/principal-seat-name.relation-property.types.ts"

export type Agent = Page & {
  assignmentSlug: AssignmentSlug
  principalSeatName?: PrincipalSeatName
  edits?: Edits
  refusals?: Refusals
  auditRefusals?: AuditRefusals
}
