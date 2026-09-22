import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const bookSection = {
  id: "01a0658d-fe50-7001-976d-fd0d35660d1d",
  type: "page-type/page-type",
  slug: "book-section",
  definition: "an instalment of a book",
  pluralSlug: "sections",
  extends: ["page-type/collection"],
  parts: ["file-property/chapter-text", "relation-property/section-of"],
  properties: [
    {
      pageProperty: "text-property/slug",
      required: true,
      many: false,
      unique: "unique-kind/page-property",
      uniqueProperty: "relation-property/section-of",
    },
    { pageProperty: "text-property/title", required: true, many: false },
    { pageProperty: "file-property/chapter-text", required: true, many: false },
    { pageProperty: "relation-property/section-of", required: true, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A section names the book the section is an instalment of.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A section's prose is a file beside the section's page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A section sits under the folders the book's own structure puts the section under.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A section's name is unique among the sections of the collection the section is part of.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A section opening its name with a number is slugged for its page type first.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
