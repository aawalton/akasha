import type { SelectProperty } from "../../../pages/select-properties/select-property.page-type.types.ts"

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
  pageTypeSlug: "select-property",
  type: "select-property",
  slug: "reading-kind",
  propertySlug: "reading-kind",
  definition: "what sort of thing a name in a world's text names",
  values: [
    "aspect",
    "boon",
    "carried-memory",
    "character",
    "class",
    "condition",
    "curse",
    "enchantment",
    "item",
    "legacy",
    "miracle",
    "none",
    "quest",
    "recipe",
    "religion",
    "reputation",
    "skill",
    "song",
    "species",
    "spell",
    "title",
    "unsure",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A reading whose kind is `unsure` is a reading nobody has ruled on yet.",
    },
  ],
} as const satisfies SelectProperty
