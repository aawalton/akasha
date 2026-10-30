import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const apiFetch = {
  id: "01a063c9-03ff-702b-9b74-c574af51ce49",
  type: "page-type/module",
  slug: "api-fetch",
  definition: "how the native shell sends a request to alanwalton.com with its own credential",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The native shell's credential is the session cookie the site set for it.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No bearer token is put on a call from the native shell.",
    },
  ],
  createdAt: "2026-09-02T20:21:53.279Z",
  updatedAt: "2026-10-30T16:58:19.064Z",
} as const satisfies Module
