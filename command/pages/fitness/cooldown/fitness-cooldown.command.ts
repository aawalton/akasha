import type { Command } from "akasha/command/command.page-type.types.ts"

export const fitnessCooldown = {
  id: "01a0bab8-8a7a-78db-bb48-a6667b1f8812",
  type: "page-type/command",
  slug: "fitness-cooldown",
  definition: "the stretch to hold next, once Alan says the bout is over",
  code: "ts",
  test: "ts",
  parts: ["module/cooling"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Alan says when the bout is over rather than having that read off his sets.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run answers the one stretch Alan is on rather than the cool down entire.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No stretch named carries the stretch that follows it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "How far Alan has come is read from the stretches he logged today.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "How many stretches and how long each is held are read from the selection policy.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A run writes nothing.",
    },
  ],
  name: "cooldown",
  arguments: [{ argument: "argument/json" }],
} as const satisfies Command
