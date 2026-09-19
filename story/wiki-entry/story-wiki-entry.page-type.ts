import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const storyWikiEntry = {
  id: "01a06578-d638-7c48-8225-eb46a4fbf9c6",
  type: "page-type/page-type",
  slug: "story-wiki-entry",
  definition: "what a story has established about one of the things in it",
  pluralSlug: "wiki-entries",
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
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An entry says the truths the story has established rather than the truths the design intends.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An entry is true as of the chapter the entry names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An entry about a setup not yet paid off is a seed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The words an entry has are the story's rather than akasha's own.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
