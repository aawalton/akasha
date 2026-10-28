import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const heldAbilityAnswering = {
  id: "01a18001-c814-730d-9e6d-251d51ea04ad",
  type: "page-type/module",
  slug: "held-ability-answering",
  definition:
    "what a route answers when a player sets a held ability aside or takes it up from the sheet",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The test proving this code sits beside the route serving this code.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A caller is let through or refused as a caller of the action bar is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A change made is answered with the event its beat states.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A change refused is answered with why, in words the player reads.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No seat is told of a change, since the next turn reads it off the pages.",
    },
  ],
  createdAt: "2026-10-28T00:56:02.836Z",
  updatedAt: "2026-10-28T00:56:02.836Z",
} as const satisfies Module
