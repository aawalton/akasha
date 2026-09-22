import type { FileProperty } from "akasha/page/file-property/file-property.page-type.types.ts"

export const rulebook = {
  id: "01a0673c-8e0e-7012-9530-56ad5cd13631",
  type: "page-type/file-property",
  slug: "rulebook",
  propertySlug: "rulebook",
  definition: "a game's rules",
  extensions: ["json"],
  decisions: [
    {
      decisionKind: "decision-kind/stopgap",
      statement: "The one game still holding this holds the prose its player is told, not rules.",
    },
  ],
  types: "ts",
} as const satisfies FileProperty
