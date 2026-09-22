import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const composeBoot = {
  id: "01a069c8-f654-7765-bacf-c9f586d7aa13",
  type: "page-type/module",
  slug: "compose-boot",
  definition:
    "a seat's system prompt: who it is, and the read that loads everything it is bound to",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A composition states who the seat is and instructs the read that loads the rest.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat whose attributes state nothing is told so and is told to read.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A composition has no path.",
    },
  ],
} as const satisfies Module
