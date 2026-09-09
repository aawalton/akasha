import type { PageType } from "@akasha/pages/page-type"
import type { Collection } from "../../../../collections/collection.page-type.ts"
import type { Title } from "../../../../pages/properties/title.text-property.ts"
import type { ChapterText } from "./properties/chapter-text.file-property.ts"
import type { SectionOf } from "./properties/section-of.relation-property.ts"

export type BookSection = Collection & {
  title: Title
  chapterText: ChapterText
  sectionOf: SectionOf
}

export const bookSection = {
  id: "01a0658d-fe50-7001-976d-fd0d35660d1d",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "book-section",
  definition: "one instalment of a book",
  pluralSlug: "book-sections",
  extends: ["page-type/collection"],
  parts: ["file-property/chapter-text", "relation-property/section-of"],
  properties: [
    {
      pageProperty: "text-property/slug",
      required: true,
      many: false,
      unique: "page-property",
      uniqueProperty: "relation-property/section-of",
    },
    { pageProperty: "text-property/title", required: true, many: false },
    { pageProperty: "file-property/chapter-text", required: true, many: false },
    { pageProperty: "relation-property/section-of", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A section names the book the section is an instalment of.",
    },
    {
      invariantKind: "departure",
      statement: "A section's prose is a file beside the section's page.",
    },
    {
      invariantKind: "departure",
      statement:
        "A section sits under the folders the book's own structure puts the section under.",
    },
    {
      invariantKind: "departure",
      statement:
        "A section's name is unique among the sections of the collection the section is part of.",
    },
    {
      invariantKind: "departure",
      statement: "A section opening its name with a number is slugged for its page type first.",
    },
  ],
} as const satisfies PageType
