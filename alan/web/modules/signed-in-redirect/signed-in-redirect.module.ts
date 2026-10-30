import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const signedInRedirect = {
  id: "01a08e1d-f4fb-72e1-9f35-8bab309aa758",
  type: "page-type/module",
  slug: "signed-in-redirect",
  definition: "how code sends a person signed in to the page alanwalton.com opens with",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A signed-in reader is sent to the home route.",
    },
  ],
  createdAt: "2026-09-11T01:38:43.067Z",
  updatedAt: "2026-10-30T17:03:20.226Z",
} as const satisfies Module
