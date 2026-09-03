import type { TextProperty } from "@akasha/pages-system/text-property"

export type EffectQuote = string

export const effectQuote = {
  id: "01a06558-a991-7e5c-b87e-45f7fdfe52b1",
  pageTypeSlug: "text-property",
  slug: "effect-quote",
  propertySlug: "effect-quote",
  definition: "the sentence what the mechanic did is read out of",
  max: 1000,
  nameFormatSlug: null,
} as const satisfies TextProperty
