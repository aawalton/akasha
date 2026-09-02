import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const gmailCredentials = {
  id: "01a05c0e-372d-7c91-883b-7354c1a663a1",
  pageTypeSlug: "module",
  slug: "gmail-credentials",
  definition: "the scopes and the refresh token a Gmail client is built with",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The scopes asked for allow writing as well as reading.",
    },
  ],
} as const satisfies Module
