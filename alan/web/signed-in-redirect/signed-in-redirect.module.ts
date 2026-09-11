import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const signedInRedirect = {
  id: "01a08e1d-f4fb-72e1-9f35-8bab309aa758",
  type: "module",
  slug: "signed-in-redirect",
  definition: "where a signed-in reader asking for a signed-out route is sent",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A signed-in reader is sent to the home route.",
    },
  ],
} as const satisfies Module
