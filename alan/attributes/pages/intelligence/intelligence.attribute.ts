import type { Attribute } from "../../attribute.page-type.types.ts"

export const intelligence = {
  id: "01a06841-a185-7471-8155-9b91e3f40e35",
  pageTypeSlug: "attribute",
  type: "attribute",
  slug: "intelligence",
  definition: "what Alan has built by learning about the world",
  pointUnit: "four learn-everything topics updated",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Four topics updated is one point.",
    },
    {
      invariantKind: "departure",
      statement: "The points are the learn-everything topics Alan updated turned into points.",
    },
    {
      invariantKind: "departure",
      statement: "A day with no count earns nothing rather than an intelligence of zero.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here counts the topics a commit updated.",
    },
  ],
} as const satisfies Attribute
