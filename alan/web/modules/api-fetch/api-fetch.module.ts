import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const apiFetch = {
  id: "01a063c9-03ff-702b-9b74-c574af51ce49",
  type: "page-type/module",
  slug: "api-fetch",
  definition: "a fetch of this site's api that has the native shell's own credential",
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
} as const satisfies Module
