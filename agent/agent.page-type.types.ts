import type { AuditRefusals } from "akasha/agent/properties/audit-refusals.file-property.types.ts"
import type { Edits } from "akasha/agent/properties/edits.file-property.types.ts"
import type { Reads } from "akasha/agent/properties/reads.file-property.types.ts"
import type { Refusals } from "akasha/agent/properties/refusals.file-property.types.ts"
import type { AssignmentSlug } from "akasha/agent/seat/properties/assignment-slug.one-of-property.types.ts"
import type { PrincipalSeatName } from "akasha/agent/seat/properties/principal-seat-name.relation-property.types.ts"
import type { Page } from "akasha/page/page.page-type.types.ts"

export type Agent = Page & {
  assignmentSlug: AssignmentSlug
  principalSeatName?: PrincipalSeatName
  edits?: Edits
  refusals?: Refusals
  auditRefusals?: AuditRefusals
  reads?: Reads
}
