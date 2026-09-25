import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const oauthTypes = {
  id: "01a0628c-26f7-76fc-b581-b548953cd882",
  type: "page-type/module",
  slug: "oauth-types",
  definition: "the types carrying an OAuth account's credential and usage state",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here runs.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An OAuthCredential names scopes as a required field.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An OAuthCredential has no `subscriptionDisabledAt` and no `terminalAlertedAt`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every OAuthCredential field is readonly.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every AccountState field is readonly.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A CredentialPick pairs one credential with the five-hour reset in milliseconds.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An AccountState has no token.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An AccountState reads the disabled flag rather than the disabled timestamp.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An OAuthCredential names its expiry `expiresAt` rather than naming the unit.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A five-hour reset is an ISO string on AccountState and milliseconds on CredentialPick.",
    },
  ],
} as const satisfies Module
