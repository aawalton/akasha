import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const driveCredentials = {
  id: "01a05bec-fc0a-7cf5-922c-10500a6552cc",
  type: "page-type/module",
  slug: "drive-credentials",
  definition: "the scope and the refresh token a Drive client is built with",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The scope asked for is read-only.",
    },
  ],
} as const satisfies Module
