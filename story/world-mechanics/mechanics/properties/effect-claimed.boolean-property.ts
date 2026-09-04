import type { BooleanProperty } from "@akasha/pages-system/boolean-property"

export type EffectClaimed = boolean

export const effectClaimed = {
  id: "01a06558-a991-70fd-9252-5b77d5adb72b",
  pageTypeSlug: "boolean-property",
  slug: "effect-claimed",
  propertySlug: "effect-claimed",
  definition: "whether an effect is read out of the text rather than stated by it",
} as const satisfies BooleanProperty
