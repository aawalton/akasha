import type { PageType } from "@akasha/pages-system/page-type"
import type { ExternalId } from "../../../../collection-system/collection-externals/properties/external-id.text-property.ts"
import type { Collection } from "../../../../collection-system/collections/collection.page-type.ts"
import type { Title } from "../../../../temper/temper-things/properties/title.text-property.ts"
import type { PassageText } from "./properties/passage-text.file-property.ts"
import type { ScriptureBook } from "./properties/scripture-book.text-property.ts"
import type { ScriptureTranslation } from "./properties/scripture-translation.select-property.ts"

export type ScripturePassage = Collection & {
  title: Title
  externalId?: ExternalId
  book?: ScriptureBook
  translation?: ScriptureTranslation
  passageText?: PassageText
}

export const scripturePassage = {
  id: "01a0658d-fe50-7005-97df-2bbcb319b080",
  pageTypeSlug: "page-type",
  slug: "scripture-passage",
  definition: "one chapter of scripture Alan reads",
  pluralSlug: "scripture-passages",
  extendsSlug: "page-type/collection",
  partSlugs: [
    "file-property/passage-text",
    "select-property/scripture-translation",
    "text-property/scripture-book",
    "text-property/title",
  ],
  properties: [
    { pagePropertySlug: "title", required: true, many: false },
    { pagePropertySlug: "external-id", required: false, many: false },
    { pagePropertySlug: "scripture-book", required: false, many: false },
    { pagePropertySlug: "scripture-translation", required: false, many: false },
    { pagePropertySlug: "passage-text", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A passage names the book of scripture the passage stands in.",
    },
    {
      invariantKind: "departure",
      statement: "A passage's verses are a file beside the passage's page.",
    },
    {
      invariantKind: "departure",
      statement: "A passage catalogued before its verses arrive carries no file yet.",
    },
    {
      invariantKind: "departure",
      statement:
        "A passage names a rendering only where the record the passage came from names one.",
    },
    {
      invariantKind: "departure",
      statement: "A passage sits in the folder named for the book of scripture it stands in.",
    },
    {
      invariantKind: "departure",
      statement:
        "A passage opening its name with a chapter number is slugged for its page type first.",
    },
    {
      invariantKind: "departure",
      statement: "A passage takes its unit from its kind rather than stating a unit of its own.",
    },
    {
      invariantKind: "gap",
      statement: "The collection a passage is part of stands as no page, so a passage names none.",
    },
  ],
} as const satisfies PageType
