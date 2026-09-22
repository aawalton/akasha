import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const gmailCredentials = {
  id: "01a05c0e-372d-7c91-883b-7354c1a663a1",
  type: "page-type/module",
  slug: "gmail-credentials",
  definition: "the scopes and the refresh token building a Gmail client",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The scopes asked for allow writing as well as reading.",
    },
  ],
} as const satisfies Module
