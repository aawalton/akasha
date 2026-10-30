import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const oauthClient = {
  id: "01a06d16-f135-7230-acd8-d3d66ea08433",
  type: "page-type/module",
  slug: "oauth-client",
  definition: "how code makes a Google client from the credentials of a Google call",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The OAuth2 handed in is the type the client comes back as.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No `@googleapis` package is reached from here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The refresh token is set on the client before the client is handed back.",
    },
  ],
  createdAt: "2026-09-04T15:43:35.221Z",
  updatedAt: "2026-10-30T16:26:02.108Z",
} as const satisfies Module
