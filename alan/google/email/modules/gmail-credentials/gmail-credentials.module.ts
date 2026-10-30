import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const gmailCredentials = {
  id: "01a05c0e-372d-7c91-883b-7354c1a663a1",
  type: "page-type/module",
  slug: "gmail-credentials",
  definition: "the credentials a call to Gmail uses",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The scopes asked for allow writing as well as reading.",
    },
  ],
  createdAt: "2026-09-01T08:20:30.637Z",
  updatedAt: "2026-10-30T15:12:31.338Z",
} as const satisfies Module
