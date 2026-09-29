import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const turnLoreInPlay = {
  id: "01a0e96b-42b5-75aa-a0e0-23dc5a700c05",
  type: "page-type/module",
  slug: "turn-lore-in-play",
  definition: "which lore pages are in play on a turn or a written chapter",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The lore in play is the lore the turn or chapter names and the lore about its characters.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The lore in play is also the lore and places its world gained or changed while it was open.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The list a turn or chapter holds is written afresh as the turn moves.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The list holds the lore in play rather than what the world builder handed in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The list drops an address no page answers to, and keeps one no seat may read.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads the disk.",
    },
  ],
} as const satisfies Module
