import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const signedInRedirect = {
  id: "01a08e1d-f4fb-72e1-9f35-8bab309aa758",
  type: "page-type/module",
  slug: "signed-in-redirect",
  definition: "where a signed-in reader asking for a signed-out route is sent",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A signed-in reader is sent to the home route.",
    },
  ],
  createdAt: "2026-09-11T01:38:43.067Z",
  updatedAt: "2026-09-15T18:21:01.000Z",
} as const satisfies Module
