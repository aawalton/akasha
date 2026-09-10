import type { PageType } from "akasha/pages/types/page-type.page-type.types.ts"

export const storyChapterPlayed = {
  id: "01a064b4-46c9-7489-9817-d9dae65e7936",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "story-chapter-played",
  definition: "a chapter of a story nobody wrote",
  pluralSlug: "story-chapters-played",
  extends: ["page-type/collection"],
  runsTabooCheck: false,
  parts: ["relation-property/played-chapter-story"],
  properties: [
    { pageProperty: "text-property/title", required: true, many: false },
    {
      pageProperty: "relation-property/played-chapter-story",
      required: true,
      many: false,
    },
    { pageProperty: "number-property/own-length", required: true, many: false },
    { pageProperty: "file-property/prose", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A chapter has the prose play made rather than prose anybody wrote.",
    },
    {
      invariantKind: "departure",
      statement: "A chapter is part of the one story the chapter was played in.",
    },
  ],
  types: "ts",
} as const satisfies PageType
