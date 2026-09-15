import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const oauthTypes = {
  id: "01a0628c-26f7-76fc-b581-b548953cd882",
  type: "module",
  slug: "oauth-types",
  definition: "the types an OAuth account's credential and usage state are carried in",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here runs.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An OAuthCredential is a CredentialDoc.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A CredentialDoc names scopes as an optional field.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An OAuthCredential names scopes as a required field.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An OAuthCredential drops the `subscriptionDisabledAt` a CredentialDoc carries.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An OAuthCredential drops the `terminalAlertedAt` a CredentialDoc carries.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every AccountState field is readonly.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A CredentialPick pairs one credential with the five-hour reset in milliseconds.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An AccountState has no token.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An AccountState reads the disabled flag rather than the disabled timestamp.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An OAuthCredential names its expiry `expiresAt` rather than naming the unit.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "No OAuthCredential field is readonly.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement:
        "A five-hour reset is an ISO string on AccountState and milliseconds on CredentialPick.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "A CredentialDoc has the disabled flag beside the disabled timestamp.",
    },
  ],
} as const satisfies Module
