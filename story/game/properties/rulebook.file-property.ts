import type { FileProperty } from "akasha/page/file-property/file-property.page-type.types.ts"

export const rulebook = {
  id: "01a0673c-8e0e-7012-9530-56ad5cd13631",
  type: "page-type/file-property",
  slug: "rulebook",
  propertySlug: "rulebook",
  definition: "the rules a game is played by",
  extensions: ["json"],
  decisions: [
    {
      decisionKind: "decision-kind/stopgap",
      statement:
        "The one game still holding this holds prose for its game master rather than rules.",
    },
  ],
  types: "ts",
} as const satisfies FileProperty
