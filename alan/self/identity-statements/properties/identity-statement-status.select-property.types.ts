import type { identityStatementStatus } from "./identity-statement-status.select-property.ts"

export type IdentityStatementStatus = (typeof identityStatementStatus.values)[number]
