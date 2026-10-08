import type { Command } from "akasha/command/command.page-type.types.ts"

export const fitnessCooldown = {
  id: "01a0bab8-8a7a-78db-bb48-a6667b1f8812",
  type: "page-type/command",
  slug: "fitness-cooldown",
  definition: "the stretch to hold next, once Alan says the bout is over",
  code: "ts",
  test: "ts",
  parts: ["module/cooling", "module/kit-loading"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Alan calls for a cool down here rather than waiting to be turned to one.",
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
      decisionKind: "decision-kind/departure",
      statement: "A stretch the kit at Alan's gym cannot carry is no stretch to offer.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Alan's gym is the one `--gym` names, else the one today's latest set names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Alan is at home where neither `--gym` nor a set today names a gym.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A run writes nothing.",
    },
  ],
  name: "cooldown",
  arguments: [{ argument: "argument/gym" }, { argument: "argument/json" }],
  updatedAt: "2026-10-08T15:15:26.338Z",
} as const satisfies Command
