import type { TextProperty } from "@akasha/pages-system/text-property"

export type ReadingKind =
  | "aspect"
  | "boon"
  | "carried-memory"
  | "character"
  | "class"
  | "condition"
  | "curse"
  | "enchantment"
  | "item"
  | "legacy"
  | "miracle"
  | "none"
  | "quest"
  | "recipe"
  | "religion"
  | "reputation"
  | "skill"
  | "song"
  | "species"
  | "spell"
  | "title"
  | "unsure"

export const readingKind = {
  id: "01a063ce-6216-7005-95f1-cc6876e8a107",
  pageTypeSlug: "text-property",
  slug: "reading-kind",
  propertySlug: "reading-kind",
  definition: "what sort of thing a name in a world's text names",
  max: 100,
  nameFormatSlug: "name-format/lower-kebab-case",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A reading whose kind is `unsure` is one nobody has ruled on yet.",
    },
    {
      invariantKind: "stopgap",
      statement: "The kinds a reading can be have no pages of their own.",
    },
    {
      invariantKind: "gap",
      statement: "This property is a relation to a reading kind.",
    },
  ],
} as const satisfies TextProperty
