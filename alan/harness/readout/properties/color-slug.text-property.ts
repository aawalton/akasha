import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const colorSlug = {
  id: "01a063bd-a526-78ae-ab87-fd2bf86d9fad",
  type: "page-type/text-property",
  slug: "color-slug",
  propertySlug: "color-slug",
  definition: "the color a reading is always drawn in",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A readout stating a color takes that color whatever the reading is.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A readout stating a color needs no scale.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "The color a readout names is a page rather than a name held as text.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
