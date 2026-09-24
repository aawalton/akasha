import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const agentMessageAttachedImages = {
  id: "01a0d4a1-3f26-7853-9819-ff4b38e9cfec",
  type: "page-type/module",
  slug: "agent-message-attached-images",
  definition: "the lines a message body carries naming the images attached to it",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An image attached to a message is named in the body by its image page's slug.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each image is one line after the words, in the order the images were attached.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each line tells the agent to bring the image here and read the file it lands in.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "A channel notification carries text alone, so no image reaches an agent inside one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A conversation shows those lines as a count of images rather than as words.",
    },
  ],
} as const satisfies Module
