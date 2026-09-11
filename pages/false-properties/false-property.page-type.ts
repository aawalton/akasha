import type { PageType } from "akasha/pages/types/page-type.page-type.types.ts"

export const falseProperty = {
  id: "01a09098-9665-7ee2-9d86-1ea894bbc313",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "false-property",
  definition: "a page property holding false and holding nothing else",
  pluralSlug: "false-properties",
  extends: ["page-type/boolean-property"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A page stating a property of this kind states false.",
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
} as const satisfies PageType
