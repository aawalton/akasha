import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const gmailDrafts = {
  id: "01a05c0e-3730-79a1-884f-5caf37ea35cf",
  type: "module",
  slug: "gmail-drafts",
  definition: "a mail written and kept unsent",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A draft is built from the same body a sent message would be.",
    },
  ],
} as const satisfies Module
