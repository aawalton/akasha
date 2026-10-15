import type { Command } from "akasha/command/command.page-type.types.ts"

export const temperSkillCheck = {
  id: "01a1403e-60df-77ff-8125-4bec00af60c9",
  type: "page-type/command",
  slug: "temper-skill-check",
  definition:
    "the command setting each number a character's slotted skills show beside UESP's equation for it",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The skills, their tooltips and the stats are read from each bar's last reading.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A tooltip's numbers are paired in order with the equations that name a number.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Only a number that scales off a stat is said, with the tooltip over the equation.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each bar says whether its reading was taken in the Archive, and the boons held.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here writes to the game or to a page.",
    },
  ],
  name: "skill-check",
  arguments: [{ argument: "argument/character" }],
  createdAt: "2026-10-15T15:46:32.286Z",
  updatedAt: "2026-10-15T16:01:40.179Z",
} as const satisfies Command
