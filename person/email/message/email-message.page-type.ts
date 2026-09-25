import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const emailMessage = {
  id: "01a06828-59d3-79b5-a23b-24604d220bf0",
  type: "page-type/page-type",
  slug: "email-message",
  definition: "a piece of mail in a person's account",
  extends: ["page-type/page"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An email rule is matched against a message.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A message belongs to the one account that message arrived in.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No message is written to a file of its own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The fields a message has are not properties.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
