import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const storyRead = {
  id: "01a06554-d8bd-7235-9a9d-e26d4823e6d0",
  type: "page-type/page-type",
  slug: "story-read",
  definition: "a story somebody else wrote",
  icon: "book-open",
  pluralSlug: "stories",
  extends: ["page-type/story", "page-type/collection-external"],
  runsTabooCheck: false,
  detailConfig: {
    header: {
      showCover: true,
      fields: [],
    },
  },
  parts: [
    "module/chapter-alerts",
    "module/chapter-turns",
    "module/reader-shell",
    "page-type/story-chapter-read",
    "select-property/publication-status",
    "text-property/external-tags",
    "domain/wandering-inn",
    "boolean-property/read-later",
  ],
  properties: [
    {
      pageProperty: "text-property/external-tags",
      required: false,
      many: true,
      maxCount: null,
    },
    { pageProperty: "select-property/publication-status", required: false, many: false },
    { pageProperty: "multi-relation-property/parts", required: false, many: true, maxCount: null },
    { pageProperty: "boolean-property/pictures-on-beats", required: false, many: false },
    { pageProperty: "boolean-property/read-later", required: false, many: false, default: false },
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
    {
      decisionKind: "decision-kind/departure",
      statement: "A story read lists its chapters once, in the view the story embeds.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That view shows only the chapters left to read until the person changes it.",
    },
  ],
  types: "ts",
  schema: "jsonl",
  createdAt: "2026-09-03T03:34:14.461Z",
  updatedAt: "2026-10-22T15:06:36.737Z",
} as const satisfies PageType
