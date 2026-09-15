import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const term = {
  id: "01a081e9-9784-7d46-ac3d-c0dd6d88cb38",
  type: "page-type/page-type",
  slug: "term",
  definition: "one word or phrase, and what that word means here",
  parts: [
    "page-type/allowed-term",
    "page-type/banned-term",
    "page-type/common-language-term",
    "page-type/foreign-name-term",
    "text-property/spelling",
    "text-property/variants",
  ],
  extends: ["page-type/page"],
  properties: [
    { pageProperty: "text-property/spelling", required: true, many: false },
    { pageProperty: "text-property/variants", required: false, many: true, maxCount: null },
    { pageProperty: "standard-agent-english-property/definition", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A domain name is defined on the domain page.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "A page address is defined in the page address system.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A common language term is defined on a page of its own.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A foreign name is defined on a page of its own.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A word and that word's variants are one term.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Two spellings that differ only by grammar are variants.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A term is written under its plainest spelling.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
