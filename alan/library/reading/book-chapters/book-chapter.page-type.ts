import type { PageType } from "@akasha/pages/page-type"
import type { Collection } from "../../../../collections/collection.page-type.ts"
import type { Title } from "../../../../pages/properties/title.text-property.ts"
import type { ChapterText } from "./properties/chapter-text.file-property.ts"

export type BookChapter = Collection & {
  title: Title
  chapterText: ChapterText
}

export const bookChapter = {
  id: "01a0658d-fe50-7001-976d-fd0d35660d1d",
  pageTypeSlug: "page-type",
  slug: "book-chapter",
  definition: "one instalment of a book",
  pluralSlug: "book-chapters",
  extendsSlug: ["page-type/collection"],
  partSlugs: ["file-property/chapter-text"],
  properties: [
    { pagePropertySlug: "slug", required: true, many: false, unique: "part-of" },
    { pagePropertySlug: "title", required: true, many: false },
    { pagePropertySlug: "chapter-text", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A chapter names the book the chapter is an instalment of.",
    },
    {
      invariantKind: "departure",
      statement: "A chapter's prose is a file beside the chapter's page.",
    },
    {
      invariantKind: "departure",
      statement:
        "A chapter sits under the folders the book's own structure puts the chapter under.",
    },
    {
      invariantKind: "departure",
      statement: "A chapter's name is unique within its book rather than across every book.",
    },
    {
      invariantKind: "departure",
      statement:
        "A chapter sharing a name inside one book is named for the folders telling those apart.",
    },
    {
      invariantKind: "departure",
      statement: "A chapter opening its name with a number is slugged for its page type first.",
    },
  ],
} as const satisfies PageType
