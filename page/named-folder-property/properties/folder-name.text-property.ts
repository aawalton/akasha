import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const folderName = {
  id: "01a081cc-3144-7cd7-8de6-3cc3911adc06",
  type: "page-type/text-property",
  slug: "folder-name",
  propertySlug: "folder-name",
  definition: "a property's folder name",
  maxLength: 100,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "This folder name is the whole name rather than a stem.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
