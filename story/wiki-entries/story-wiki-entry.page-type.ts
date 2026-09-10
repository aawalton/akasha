import type { PageType } from "@akasha/pages/page-type"

export const storyWikiEntry = {
  id: "01a06578-d638-7c48-8225-eb46a4fbf9c6",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "story-wiki-entry",
  definition: "what a story has established about one of the things in it",
  pluralSlug: "story-wiki-entries",
  extends: ["page-type/page"],
  runsTabooCheck: false,
  parts: ["number-property/chapter-number", "select-property/wiki-kind"],
  properties: [
    { pageProperty: "text-property/title", required: true, many: false },
    { pageProperty: "relation-property/world", required: false, many: false },
    { pageProperty: "select-property/wiki-kind", required: false, many: false },
    { pageProperty: "number-property/chapter-number", required: false, many: false },
    { pageProperty: "file-property/prose", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "An entry says the truths the story has established rather than the truths the design intends.",
    },
    {
      invariantKind: "departure",
      statement: "An entry is true as of the chapter the entry names.",
    },
    {
      invariantKind: "departure",
      statement: "An entry about a setup not yet paid off is a seed.",
    },
    {
      invariantKind: "departure",
      statement: "The words an entry has are the story's rather than akasha's own.",
    },
  ],
  types: "ts",
} as const satisfies PageType
