import type { Command } from "akasha/command/command.page-type.types.ts"

export const temperTooltipCompare = {
  id: "01a15c14-50a3-71a2-a7f0-58917ebc0bf7",
  type: "page-type/command",
  slug: "temper-tooltip-compare",
  definition:
    "the command setting each number a character's slotted skills show beside Temper's, by reading",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The readings are read from the character's readings file, one reading to a line.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The newest three readings are shown where no reading is named.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reading is named by the second it was captured or by the start of its id.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each slotted skill's tooltip is the text the game gave in that reading.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Temper's number is the skill's equation worked out from that reading's stats.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The passives, stars and weapons an equation reads are those the build hash holds on its bar.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A skill is found by the ability id the reading gives it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Each tooltip number is set beside Temper's and the gap, and an exact one is marked.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A skill Temper holds no equations for is said, and so is one left unpaired.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each reading counts the tooltip numbers Temper gives exactly.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A line of the readings that does not read is counted and the first one said.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reaches the game or writes a page.",
    },
  ],
  name: "tooltip-compare",
  arguments: [
    { argument: "argument/character", required: true, saidAs: "flag-or-word" },
    { argument: "argument/reading-count" },
    { argument: "argument/captured-at", notWith: ["argument/reading-id"] },
    { argument: "argument/reading-id" },
    { argument: "argument/json" },
  ],
  createdAt: "2026-10-21T01:29:57.666Z",
  updatedAt: "2026-10-21T04:50:32.260Z",
} as const satisfies Command
