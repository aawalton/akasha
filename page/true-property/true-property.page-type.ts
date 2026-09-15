import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const trueProperty = {
  id: "01a09096-7619-7b62-b6a6-292e9807cf7b",
  type: "page-type",
  slug: "true-property",
  definition: "a page property holding true and holding nothing else",
  extends: ["page-type/boolean-property"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A page stating a property of this kind states true.",
    },
    {
      invariantKind: "departure",
      statement: "The type written for such a property is the literal rather than a boolean.",
    },
    {
      invariantKind: "departure",
      statement: "A record telling itself from a sibling by one field states that field here.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
