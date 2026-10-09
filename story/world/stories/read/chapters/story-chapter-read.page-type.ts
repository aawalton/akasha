import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const storyChapterRead = {
  id: "01a06554-d8bd-72ef-8a40-8ab143986c70",
  type: "page-type/page-type",
  slug: "story-chapter-read",
  definition: "a chapter of a story somebody else wrote",
  pluralSlug: "chapters",
  extends: ["page-type/chapter", "page-type/collection-external"],
  runsTabooCheck: false,
  detailConfig: {
    frame: {
      edgeToEdge: true,
      focusMode: true,
      autoScroll: {
        loadScroll: "progress",
      },
    },
    bodyPropertyId: "prose",
    fullBleed: true,
    showReadingProgress: true,
    markReadOnEnd: true,
    progressPropertyId: "ownProgress",
    lengthPropertyId: "ownLength",
  },
  mediaConfig: {
    audio: {
      sourcePropertyId: "prose",
      renderer: "tts",
      variantAxis: "narrator",
    },
    image: {
      renderer: "z-image-turbo",
    },
  },
  sequence: {
    groupBy: "story",
    orderBy: "position",
    direction: "asc",
  },
  parts: [
    "instant-property/marked-read-at",
    "instant-property/removed-at",
    "named-folder-property/everything-unread-folder",
  ],
  properties: [
    { pageProperty: "instant-property/removed-at", required: false, many: false },
    { pageProperty: "instant-property/marked-read-at", required: false, many: false },
    {
      pageProperty: "named-folder-property/everything-unread-folder",
      required: false,
      many: false,
    },
    {
      pageProperty: "multi-relation-property/scene-images",
      required: false,
      many: true,
      maxCount: null,
    },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The source a chapter came from is the source its story names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A chapter the source took down is kept rather than removed.",
    },
  ],
  types: "ts",
  schema: "jsonl",
  createdAt: "2026-09-03T03:34:14.461Z",
  updatedAt: "2026-10-09T00:59:20.285Z",
} as const satisfies PageType
