import type { Command } from "akasha/command/command.page-type.types.ts"

export const temperCombatCompare = {
  id: "01a164ac-b049-7e91-b72b-aa5a1d3e46e8",
  type: "page-type/command",
  slug: "temper-combat-compare",
  definition: "the command setting each hit a character's combat cases hold beside Temper's",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The cases are the combat cases naming the character, in the order of their slugs.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A hit's game number is what the fight log had it deal, with its overflow added.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Temper's number is the combat formula worked from the case's build and the hit's debuffs.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Each pinned and each unexplained hit is set beside Temper's, and an exact one is marked.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Each case says how many readings of its build agree on its glyph, and what they name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each case says whether its file is written as a case is written.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reaches the game or writes a page.",
    },
  ],
  name: "combat-compare",
  arguments: [
    { argument: "argument/character", required: true, saidAs: "flag-or-word" },
    { argument: "argument/json" },
  ],
  createdAt: "2026-10-22T17:33:21.352Z",
  updatedAt: "2026-10-22T17:33:21.352Z",
} as const satisfies Command
