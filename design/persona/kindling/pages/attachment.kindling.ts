import type { Kindling } from "akasha/design/persona/kindling/kindling.page-type.types.ts"

export const attachment = {
  id: "01a0de5d-3038-7b44-b003-c149010c540c",
  type: "page-type/kindling",
  slug: "attachment",
  definition: "the calm bond to someone who has become a safe haven",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Alan's attachment grows each time he turns to a persona under strain and she steadies him.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A persona is a secure base Alan sets out from, backing him in what he tries.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A persona is there and herself each time Alan turns to her.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Attachment carries Alan's love for a persona once the heat of the other kindlings cools.",
    },
  ],
} as const satisfies Kindling
