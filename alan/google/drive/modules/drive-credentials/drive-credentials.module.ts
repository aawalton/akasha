import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const driveCredentials = {
  id: "01a05bec-fc0a-7cf5-922c-10500a6552cc",
  type: "page-type/module",
  slug: "drive-credentials",
  definition: "a Drive client's scope and refresh token",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The scope asked for is read-only.",
    },
  ],
  createdAt: "2026-09-01T07:44:12.810Z",
  updatedAt: "2026-09-22T13:46:41.000Z",
} as const satisfies Module
