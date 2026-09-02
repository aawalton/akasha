import type { Module } from "@akasha/code-system/module"

export const housingChatCapture = {
  id: "01a06128-d5c8-74ad-829d-e287530df9eb",
  pageTypeSlug: "module",
  slug: "housing-chat-capture",
  definition: "reading a visit card out of a chat line another player sent",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A line is a visit card only when the line carries the agreed key word.",
    },
    {
      invariantKind: "departure",
      statement: "Which chat channels may carry a card is a player setting.",
    },
  ],
} as const satisfies Module
