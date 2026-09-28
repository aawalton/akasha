import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const mechanicDefining = {
  id: "01a0e967-0009-7382-8051-6d9bbacf64a2",
  type: "page-type/module",
  slug: "mechanic-defining",
  definition: "whether a draft defines a mechanic its caller's role may not define",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Only the world builder defines a mechanic a game's turns reach.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A draft adding a page of a mechanic kind that is not there yet defines that mechanic.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A kind with a required relation to a character or a mechanic tracks what is defined already.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A relation naming many pages counts as a relation naming one does.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A page tracking what is defined already brings no new lore, so it defines nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A game master, writer, reviewer or recorder defining a mechanic is refused, and nothing is kept.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A subagent is held to the role of the seat running it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A caller with no seat, or a seat of any other role, is let through.",
    },
  ],
} as const satisfies Module
