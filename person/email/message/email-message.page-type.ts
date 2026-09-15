import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const emailMessage = {
  id: "01a06828-59d3-79b5-a23b-24604d220bf0",
  type: "page-type/page-type",
  slug: "email-message",
  definition: "one piece of mail in a person's account",
  extends: ["page-type/page"],
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "An email rule is matched against a message.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A message belongs to the one account that message arrived in.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No message is written to a file of its own.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "The fields a message has are yet to exist as properties.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
