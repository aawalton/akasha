import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const oauthClient = {
  id: "01a06d16-f135-7230-acd8-d3d66ea08433",
  pageTypeSlug: "module",
  slug: "oauth-client",
  definition: "the Google OAuth client built out of the OAuth2 the caller hands in",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The OAuth2 handed in is the type the client comes back as.",
    },
    {
      invariantKind: "absence",
      statement: "No `@googleapis` package is reached from here.",
    },
    {
      invariantKind: "departure",
      statement: "The refresh token is set on the client before the client is handed back.",
    },
  ],
} as const satisfies Module
