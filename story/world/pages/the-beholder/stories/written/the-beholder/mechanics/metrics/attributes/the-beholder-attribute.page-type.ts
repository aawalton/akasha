import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const theBeholderAttribute = {
  id: "01a0deec-7455-7d2c-a9a6-9fa1a5ad06e0",
  type: "page-type/page-type",
  slug: "the-beholder-attribute",
  definition:
    "a number the System overlays on a person in The Beholder, where 10 is an average adult",
  pluralSlug: "attributes",
  extends: ["page-type/metric-character-attribute"],
  parts: [
    "page-type/the-beholder-might",
    "page-type/the-beholder-vitality",
    "page-type/the-beholder-celerity",
    "page-type/the-beholder-acuity",
    "page-type/the-beholder-will",
    "page-type/the-beholder-allure",
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An attribute is kept to one decimal.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
