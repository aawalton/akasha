import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const storyRead = {
  id: "01a06554-d8bd-7235-9a9d-e26d4823e6d0",
  type: "page-type/page-type",
  slug: "story-read",
  definition: "a story somebody else wrote",
  pluralSlug: "stories",
  extends: ["page-type/collection-external"],
  runsTabooCheck: false,
  detailConfig: {
    header: {
      showCover: true,
      fields: [],
    },
    childCollection: {
      childType: "page-type/story-chapter-read",
      childRelation: "story",
    },
  },
  parts: [
    "module/chapter-alerts",
    "module/chapter-channel",
    "module/chapter-turns",
    "module/reader-shell",
    "select-property/publication-status",
    "text-property/external-tags",
    "relation-property/parts",
  ],
  properties: [
    { pageProperty: "text-property/title", required: true, many: false },
    { pageProperty: "relation-property/world", required: false, many: false },
    {
      pageProperty: "text-property/external-tags",
      required: false,
      many: true,
      maxCount: null,
    },
    { pageProperty: "select-property/publication-status", required: false, many: false },
    { pageProperty: "file-property/prose", required: false, many: false },
    { pageProperty: "relation-property/parts", required: false, many: true, maxCount: null },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A story read has the words of the story's writer rather than akasha's own.",
    },

    {
      decisionKind: "decision-kind/departure",
      statement: "A story names the source the story was read from.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A source with no page for a story leaves that story naming no link and no id.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The text a story has here is the description the source gives the story.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A tag the source gave and a tag the person gave are two properties.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
