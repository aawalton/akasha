import type { Command } from "akasha/command/command.page-type.types.ts"

export const seatSend = {
  id: "01a0d481-29ab-72ea-b0cb-b971e72633c3",
  type: "page-type/command",
  slug: "seat-send",
  definition: "the command sending a message from the calling seat to another seat",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A message is sent from the seat the calling agent sits in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A subagent sends as the seat that ran the subagent.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every message sent here announces rather than asks for a block to clear.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A message to a name no seat holds is refused, and nothing is sent.",
    },
  ],
  name: "send",
  arguments: [
    { argument: "argument/to-seat", required: true },
    { argument: "argument/body-file", notWith: ["argument/body"], oneOf: ["argument/body"] },
    { argument: "argument/body" },
  ],
} as const satisfies Command
