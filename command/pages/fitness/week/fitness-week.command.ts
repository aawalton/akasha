import type { Command } from "akasha/command/command.page-type.types.ts"

export const fitnessWeek = {
  id: "01a0b6de-d8b5-7094-8d97-329aa11e314c",
  type: "page-type/command",
  slug: "fitness-week",
  definition: "what the trailing week of training held, by muscle and by pattern",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The week is the seven days ending today.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A day turns over at six in the morning where Alan is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A set counts toward a total only where that set was taken near failure.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Near failure is the effort the selection policy names, and above.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A warmup set counts toward no total.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A set stating no effort counts toward no total.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A set counts once toward every muscle its movement names as primary.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A muscle a movement names as secondary takes no count.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A muscle under the weekly floor is answered before a muscle above that floor.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A muscle with no set in the week is answered as none rather than left out.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The floor and the ceiling are read from the selection policy rather than here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A pattern is counted the way a muscle is counted.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A pattern has no floor and no ceiling.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A pattern is answered most worked first.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The answer says how many sets the week held and how many were passed over.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every answer here is built by a function rather than written out as a value.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A run writes nothing.",
    },
  ],
  name: "week",
  arguments: [{ argument: "argument/json" }],
} as const satisfies Command
