import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const turnUndoRefused = {
  id: "01a0f1c7-4de9-799d-b9f0-dc0f6cc64803",
  type: "page-type/text-property",
  slug: "turn-undo-refused",
  propertySlug: "turn-undo-refused",
  definition: "why the last turn a story's player asked to have undone was not undone",
  maxLength: 2000,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A turn undone takes this off, so it speaks only for the last ask.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
