import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export type AddonName = string

export const addonName = {
  id: "01a0819c-d367-7e7f-bd2f-562afd223044",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "addon-name",
  propertySlug: "addon-name",
  definition: "the name the game loads an addon under",
  maxLength: 100,
  nameFormat: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "The name is spelled as the addon's own manifest spells it.",
    },
    {
      invariantKind: "departure",
      statement: "The addon roster answers with this name for the addon.",
    },
  ],
} as const satisfies TextProperty
