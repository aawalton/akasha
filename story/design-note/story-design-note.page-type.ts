import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const storyDesignNote = {
  id: "01a06578-d638-794d-b1f4-f5c46500a7e9",
  type: "page-type/page-type",
  slug: "story-design-note",
  definition: "one document worked out while a story's design was being settled",
  pluralSlug: "design-notes",
  extends: ["page-type/page"],
  runsTabooCheck: false,
  parts: ["text-property/note-subject"],
  properties: [
    { pageProperty: "text-property/title", required: true, many: false },
    { pageProperty: "relation-property/world", required: false, many: false },
    { pageProperty: "text-property/note-subject", required: false, many: false },
    { pageProperty: "file-property/prose", required: false, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A note is one working document rather than the design the note was worked out for.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A story has as many notes as were written.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A note has its whole document beside the page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A note with data rather than prose has that data beside the page as the data was written.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The words a note has are the story's rather than akasha's own.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
