import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const agentMessageDeliveryWitness = {
  id: "01a0686c-f06b-7011-b06e-16258f8aa85f",
  type: "page-type/module",
  slug: "agent-message-delivery-witness",
  definition: "how code waits until a message sent to a seat was shown to the seat",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A message is let go only where a transcript has the injection itself.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A take that is refused or throws is said and tried again at the next look.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A message seen in a transcript is marked shown before the take is tried.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A message shown to be lost is given up on rather than waited on.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A message whose seat is mid-turn is waited on however long that takes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A message nothing can be told about is given up on after a few looks.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A message given up on stays claimed rather than being offered again.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The transcript the seat has now is read as well as the transcript that seat held then.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A transcript that cannot be read is passed over rather than counted as silence.",
    },
  ],
} as const satisfies Module
