import type { identityStatementStatus } from "akasha/alan/self/identity-statements/properties/identity-statement-status.select-property.ts"

export type IdentityStatementStatus = (typeof identityStatementStatus.values)[number]
