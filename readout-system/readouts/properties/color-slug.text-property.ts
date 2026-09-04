import type { TextProperty } from "@akasha/pages-system/text-property"

export type ColorSlug = string

export const colorSlug = {
  id: "01a063bd-a526-78ae-ab87-fd2bf86d9fad",
  pageTypeSlug: "text-property",
  slug: "color-slug",
  propertySlug: "color-slug",
  definition: "the color a reading is always drawn in",
  max: 100,
  nameFormatSlug: "name-format/lower-kebab-case",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A readout stating a color takes that color whatever the reading is.",
    },
    {
      invariantKind: "departure",
      statement: "A readout stating a color needs no scale.",
    },
    {
      invariantKind: "gap",
      statement: "The color a readout names is a page rather than a name held as text.",
    },
  ],
} as const satisfies TextProperty
