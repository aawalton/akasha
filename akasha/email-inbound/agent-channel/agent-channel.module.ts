import type { Module } from "../../code-system/modules/module.page-type.ts"

export const agentChannel = {
  id: "01a05bcd-25e3-7b2c-b378-4f00fd2d5eaa",
  pageTypeSlug: "module",
  slug: "agent-channel",
  definition: "which persona's channel a set of recipient headers names",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The header values are joined and read as one lowercase string.",
    },
    {
      invariantKind: "departure",
      statement: "The first channel address that string holds names the handle.",
    },
  ],
} as const satisfies Module
