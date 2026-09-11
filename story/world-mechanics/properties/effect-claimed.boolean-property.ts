import type { BooleanProperty } from "akasha/pages/boolean-properties/boolean-property.page-type.types.ts"

export const effectClaimed = {
  id: "01a06558-a991-70fd-9252-5b77d5adb72b",
  type: "boolean-property",
  slug: "effect-claimed",
  propertySlug: "effect-claimed",
  definition: "whether an effect is read out of the text rather than stated by it",
  types: "ts",
} as const satisfies BooleanProperty
