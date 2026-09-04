import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const gmailHistory = {
  id: "01a05c0e-3730-7af5-a10b-a823e4340d0b",
  pageTypeSlug: "module",
  slug: "gmail-history",
  definition: "what arrived in the mailbox since a point Gmail names",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A starting point Gmail no longer holds answers as stale rather than throwing.",
    },
    {
      invariantKind: "departure",
      statement: "Every page of history is walked before an answer is given.",
    },
    {
      invariantKind: "departure",
      statement: "A message named across pages is one message.",
    },
  ],
} as const satisfies Module
