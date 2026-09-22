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
      statement: "An OAuthCredential is a CredentialDoc.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A CredentialDoc names scopes as an optional field.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An OAuthCredential names scopes as a required field.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An OAuthCredential drops the `subscriptionDisabledAt` a CredentialDoc carries.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An OAuthCredential drops the `terminalAlertedAt` a CredentialDoc carries.",
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
      decisionKind: "decision-kind/gap",
      statement: "No OAuthCredential field is readonly.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement:
        "A five-hour reset is an ISO string on AccountState and milliseconds on CredentialPick.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement: "A CredentialDoc has the disabled flag beside the disabled timestamp.",
    },
  ],
} as const satisfies Module
