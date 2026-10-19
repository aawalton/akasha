import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const provider = {
  id: "01a0a224-4613-75c9-a6cf-5bdd8111001d",
  type: "page-type/relation-property",
  slug: "provider",
  propertySlug: "provider",
  definition: "the company that runs the models a page calls",
  targetPageType: "page-type/model-provider",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A seat stating no provider calls the Anthropic accounts and falls back to DeepSeek.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat stating Anthropic calls the Anthropic accounts as one stating none does.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A seat stating another provider calls that provider rather than any Anthropic account.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat's provider takes effect at the seat's next call, with no restart.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-14T22:58:01.363Z",
  updatedAt: "2026-10-19T18:43:06.415Z",
} as const satisfies RelationProperty
