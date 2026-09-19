import type { Command } from "akasha/command/command.page-type.types.ts"

export const fitnessMobility = {
  id: "01a0b72c-3d76-75eb-92a1-4fc4a0021192",
  type: "page-type/command",
  slug: "fitness-mobility",
  definition: "how far each joint moved, and which way that is going",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A joint's mobility reads as a direction from its first numbered reading to its last.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A higher number is farther, whatever the metric.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A metric read on one side is answered apart from that metric on the other side.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reading with no number takes no part in a direction.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A metric with fewer than two numbered readings has no direction yet.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every metric with a reading is answered, in the order the metrics are named.",
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
  name: "mobility",
  arguments: [{ argument: "argument/json" }],
} as const satisfies Command
