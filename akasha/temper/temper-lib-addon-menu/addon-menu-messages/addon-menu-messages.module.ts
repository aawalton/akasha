import type { Module } from "@akasha/code-system/module"

export const addonMenuMessages = {
  id: "01a06100-0000-7000-8000-000000000005",
  pageTypeSlug: "module",
  slug: "addon-menu-messages",
  definition: "the queued chat output and the debug logger of the library",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "Messages queue until the chat system has a primary container.",
    },
    {
      invariantKind: "departure",
      statement: "Every message printed to chat carries a LAM2 prefix.",
    },
    {
      invariantKind: "departure",
      statement: "A missing LibDebugLogger yields a logger whose methods do nothing.",
    },
  ],
} as const satisfies Module
