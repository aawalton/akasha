import type { PageType } from "akasha/pages/types/page-type.page-type.types.ts"

export const bookRecord = {
  id: "01a0657d-b91d-7500-8bc9-4bbfb71443f8",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "book-record",
  definition: "one record kept about a book Alan is writing",
  pluralSlug: "book-records",
  extends: ["page-type/page"],
  runsTabooCheck: false,
  parts: [
    "file-property/writing",
    "text-property/kept-by",
    "text-property/record-book-slug",
    "text-property/record-brief",
  ],
  properties: [
    { pageProperty: "text-property/title", required: true, many: false },
    { pageProperty: "standard-agent-english-property/definition", required: true, many: false },
    { pageProperty: "text-property/record-book-slug", required: true, many: false },
    { pageProperty: "text-property/record-brief", required: false, many: false },
    { pageProperty: "text-property/kept-by", required: false, many: false },
    { pageProperty: "file-property/writing", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "One book has more than one record.",
    },
    {
      invariantKind: "departure",
      statement: "A record has the words of the book's keeper rather than akasha's words.",
    },
    {
      invariantKind: "absence",
      statement: "A record is no part of the book the record is kept about.",
    },
    {
      invariantKind: "departure",
      statement: "A record a command generates is written whole rather than edited by hand.",
    },
  ],
  types: "ts",
} as const satisfies PageType
