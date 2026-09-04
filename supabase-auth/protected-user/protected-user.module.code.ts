import { USER_ID } from "../user-id/user-id.module.code.ts"

export interface CredentialPathDecision {
  readonly resolvedUserId: string
  readonly deliberateRealUserOptIn?: boolean
  readonly readOnly?: boolean
}

export function assertCredentialPathAllowed(decision: CredentialPathDecision): undefined {
  if (decision.resolvedUserId !== USER_ID) return
  if (decision.deliberateRealUserOptIn === true && decision.readOnly === true) return
  throw new Error(
    `credential guard refused to operate as the protected real user (${decision.resolvedUserId}): ` +
      "this path resolved to USER_ID without a deliberate read-only opt-in. " +
      "Use the throwaway browser-test user for the default path, or " +
      "createReadOnlyRealUserHarness for a deliberate, read-only real-user opt-in."
  )
}
