import type { Module } from "@akasha/code-system/module"

export const oauthTypes = {
  id: "01a0628c-26f7-76fc-b581-b548953cd882",
  pageTypeSlug: "module",
  slug: "oauth-types",
  definition: "the types an OAuth account's credential and usage state are carried in",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "absence",
      statement: "Nothing here runs.",
    },
    {
      invariantKind: "departure",
      statement: "An OAuthCredential is a CredentialDoc.",
    },
    {
      invariantKind: "departure",
      statement: "A CredentialDoc names scopes as an optional field.",
    },
    {
      invariantKind: "departure",
      statement: "An OAuthCredential names scopes as a required field.",
    },
    {
      invariantKind: "departure",
      statement: "An OAuthCredential drops the `subscriptionDisabledAt` a CredentialDoc carries.",
    },
    {
      invariantKind: "departure",
      statement: "An OAuthCredential drops the `terminalAlertedAt` a CredentialDoc carries.",
    },
    {
      invariantKind: "departure",
      statement: "Every AccountState field is readonly.",
    },
    {
      invariantKind: "departure",
      statement: "A CredentialPick pairs one credential with the five-hour reset in milliseconds.",
    },
    {
      invariantKind: "departure",
      statement: "An AccountState carries no token.",
    },
    {
      invariantKind: "departure",
      statement: "An AccountState reads the disabled flag rather than the disabled timestamp.",
    },
    {
      invariantKind: "departure",
      statement: "An OAuthCredential names its expiry `expiresAt` rather than naming the unit.",
    },
    {
      invariantKind: "gap",
      statement: "No OAuthCredential field is readonly.",
    },
    {
      invariantKind: "gap",
      statement:
        "A five-hour reset is an ISO string on AccountState and milliseconds on CredentialPick.",
    },
    {
      invariantKind: "gap",
      statement: "A CredentialDoc carries the disabled flag beside the disabled timestamp.",
    },
  ],
} as const satisfies Module
