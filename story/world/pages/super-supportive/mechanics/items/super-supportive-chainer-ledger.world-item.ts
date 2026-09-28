import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const superSupportiveChainerLedger = {
  id: "01a0e9f9-1fa1-712d-b9a9-873b546734c0",
  type: "page-type/world-item",
  slug: "super-supportive-chainer-ledger",
  title: "Chainer ledger",
  world: "world/super-supportive",
  aliases: ["ledger"],
  description:
    "A small brownish-red book, opening bottom to top, that records a student's wordchains and dates.",
} as const satisfies WorldItem
