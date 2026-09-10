import type { Domain } from "../domains/domain.page-type.types.ts"
import type { OnCall } from "../seat-system/seats/properties/on-call.boolean-property.ts"

export type Role = Domain & {
  onCall: OnCall
}
