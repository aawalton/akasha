import type { FileProperty } from "akasha/page/file-property/file-property.page-type.types.ts"

export const designNote = {
  id: "01a0c93e-712d-7182-aebc-49d4265cf68a",
  type: "page-type/file-property",
  slug: "design-note",
  propertySlug: "note",
  definition: "what a design entry settles, in the words the game master wrote",
  extensions: ["md"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A heading names each part of what an entry settles.",
    },
  ],
  types: "ts",
} as const satisfies FileProperty
