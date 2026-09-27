import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const turnReaching = {
  id: "01a0deca-7611-7847-a6a4-5c79cbbc8739",
  type: "page-type/module",
  slug: "turn-reaching",
  definition: "what an advance or a rewind reads and does outside the turn's own landing",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A caller's seat is the seat it sits in, or the seat above it for a subagent.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reviewer or recorder seat starts headless, as Alan's, with no seat above it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A notice reaches the game's game master, world builder and writer seats.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A recorder's advance moves the edits its seat kept beside the turn's page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Edits kept beside a turn outlive the seat that drafted them.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat is stopped by a process of its own session that no stopped seat carries.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The stop names no agent, since the agent it would name is the one ending.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A notice starts a game seat that never ran.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The lore about a turn's characters is every unwithheld lore page about one or its persona.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A turn's characters are those it names and those every turn of its story names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A notice moving a turn to writer names the lore about the turn's characters.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each seat a notice reaches is named the lore it read that has changed since.",
    },
  ],
} as const satisfies Module
