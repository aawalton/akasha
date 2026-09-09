import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const errorMessage = {
  id: "01a06287-7841-76ad-85d5-861974947268",
  pageTypeSlug: "module",
  slug: "error-message",
  definition: "the message read off a thrown value of any shape",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "A thrown value that renders to nothing still answers with a message.",
    },
  ],
} as const satisfies Module
