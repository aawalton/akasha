import type { Module } from "@akasha/code-system/module"

export const ascClient = {
  id: "01a05cee-e560-7e4e-918a-7f897a988209",
  pageTypeSlug: "module",
  slug: "asc-client",
  definition: "the App Store Connect REST client that mints its own ES256 JWT from the local .p8",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "the JWT is signed with WebCrypto ECDSA P-256 rather than with a JWT library",
    },
    {
      invariantKind: "constraint",
      statement: "an App Store Connect JWT minted here lives for 900 seconds",
    },
    {
      invariantKind: "constraint",
      statement:
        "an expired token draws the same 401 from App Store Connect as a key lacking access",
    },
    {
      invariantKind: "constraint",
      statement: "a poll outliving its token reads back as a permissions failure on the key",
    },
    {
      invariantKind: "departure",
      statement:
        "a long-running read asks the token source for a token per request rather than holding one",
    },
    {
      invariantKind: "departure",
      statement: "a token source re-mints once the held token is within 120 seconds of expiry",
    },
    {
      invariantKind: "constraint",
      statement:
        "the .p8 private key is read from the workstation home directory rather than from this code",
    },
    {
      invariantKind: "departure",
      statement: "every response schema passes unknown App Store Connect fields through untouched",
    },
    {
      invariantKind: "departure",
      statement:
        "a 401 or 403 from App Store Connect is reported as the key lacking the App Manager role",
    },
  ],
} as const satisfies Module
