import type { SelectProperty } from "@akasha/pages-system/select-property"

export const scriptureTranslation = {
  id: "01a0658d-fe50-7004-9783-8442718557a7",
  pageTypeSlug: "select-property",
  slug: "scripture-translation",
  propertySlug: "translation",
  definition: "the rendering of scripture a passage is read from",
  values: ["book-of-mormon", "web"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A book of scripture is read from one rendering.",
    },
  ],
} as const satisfies SelectProperty

export type ScriptureTranslation = (typeof scriptureTranslation.values)[number]
