import type { PageType } from "@akasha/pages/page-type"

export const storyRead = {
  id: "01a06554-d8bd-7235-9a9d-e26d4823e6d0",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "story-read",
  definition: "a story somebody else wrote",
  pluralSlug: "stories-read",
  extends: ["page-type/collection-external"],
  runsTabooCheck: false,
  detailConfig: {
    display: "collection",
    header: {
      showCover: true,
      fields: [],
    },
    childCollection: {
      childType: "story-chapter-read",
      childRelation: "story",
    },
  },
  parts: ["select-property/publication-status", "text-property/external-tags"],
  properties: [
    { pageProperty: "text-property/title", required: true, many: false },
    { pageProperty: "relation-property/world", required: false, many: false },
    { pageProperty: "text-property/source", required: true, many: false },
    {
      pageProperty: "text-property/external-tags",
      required: false,
      many: true,
      maxCount: null,
    },
    { pageProperty: "select-property/publication-status", required: false, many: false },
    { pageProperty: "file-property/prose", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A story read has the words of the story's writer rather than akasha's own.",
    },

    {
      invariantKind: "departure",
      statement: "A story names the source the story was read from.",
    },
    {
      invariantKind: "departure",
      statement: "A source with no page for a story leaves that story naming no link and no id.",
    },
    {
      invariantKind: "departure",
      statement: "The text a story has here is the description the source gives the story.",
    },
    {
      invariantKind: "departure",
      statement: "A tag the source gave and a tag the person gave are two properties.",
    },
  ],
  types: "ts",
} as const satisfies PageType
