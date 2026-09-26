import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const guildStorePoster = {
  id: "01a060a9-5d59-7ff2-971b-202f4a680195",
  type: "page-type/module",
  slug: "guild-store-poster",
  definition: "the handshake the game asks for before an item goes up for sale",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "One post is in flight at a time.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An item outside the backpack is never posted.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The item is set pending before the post is issued.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The post is issued from the game's pending-item event.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A caller asking while a post is in flight is answered false.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A trading house error settles the post as failed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Closing the trading house settles the post as failed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A failed post is settled with the game's reason where the game gave one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Whether any flow has an item pending is answered to every addon part.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Disposal unregisters the four events the flow registered.",
    },
  ],
} as const satisfies Module
