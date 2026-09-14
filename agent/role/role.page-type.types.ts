import type { OnCall } from "akasha/agent/seat/properties/on-call.boolean-property.types.ts"
import type { Domain } from "akasha/domains/domain.page-type.types.ts"

export type Role = Domain & {
  onCall: OnCall
}
