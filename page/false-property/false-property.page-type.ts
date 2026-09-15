import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const falseProperty = {
  id: "01a09098-9665-7ee2-9d86-1ea894bbc313",
  type: "page-type",
  slug: "false-property",
  definition: "a page property holding false and holding nothing else",
  extends: ["page-type/boolean-property"],
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page stating a property of this kind states false.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The type written for such a property is the literal rather than a boolean.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A record telling itself from a sibling by one field states that field here.",
    },
  ],
  types: "ts",
  schema: "jsonl",
  shapes: "jsonl",
} as const satisfies PageType
