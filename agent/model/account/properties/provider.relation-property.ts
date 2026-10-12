import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const provider = {
  id: "01a0a224-4613-75c9-a6cf-5bdd8111001d",
  type: "page-type/relation-property",
  slug: "provider",
  propertySlug: "provider",
  definition: "the company that runs the models a model account or a seat calls",
  targetPageType: "page-type/model-provider",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A seat stating no provider calls the Anthropic accounts and falls back to DeepSeek.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-14T22:58:01.363Z",
  updatedAt: "2026-10-12T12:30:29.309Z",
} as const satisfies RelationProperty
