import type { PagePropertyEntry } from "@akasha/pages-system/page-property-entry"

export type CharacterReadings = "jsonl"

export const characterReadings = {
  id: "01a063ce-6216-7001-b3f6-26b45c0bef56",
  pageTypeSlug: "page-property-entry",
  slug: "character-readings",
  propertySlug: "character-readings",
  definition: "how each name a world's text uses is read as a character, one name to a line",
  properties: [
    { pagePropertySlug: "reading-slug", required: true, many: false },
    { pagePropertySlug: "reading-name", required: true, many: false },
    { pagePropertySlug: "reading-kind", required: true, many: false },
    { pagePropertySlug: "character-slug", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A reading names its character only where the reading's kind is `character`.",
    },
  ],
} as const satisfies PagePropertyEntry
