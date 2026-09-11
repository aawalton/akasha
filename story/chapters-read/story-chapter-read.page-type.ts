import type { PageType } from "akasha/pages/types/page-type.page-type.types.ts"

export const storyChapterRead = {
  id: "01a06554-d8bd-72ef-8a40-8ab143986c70",
  type: "page-type",
  slug: "story-chapter-read",
  definition: "a chapter of a story somebody else wrote",
  pluralSlug: "story-chapters-read",
  extends: ["page-type/collection-external"],
  runsTabooCheck: false,
  detailConfig: {
    display: "reader",
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
    "number-property/anchor-beat",
    "number-property/anchor-volume",
    "page-property-entry/chronology-anchors",
    "relation-property/read-chapter-story",
    "select-property/anchor-direction",
    "select-property/anchor-kind",
    "select-property/anchor-standing",
    "select-property/anchor-tier",
    "text-property/anchor-chapter",
    "text-property/anchor-claimed-by",
    "text-property/anchor-lexeme",
    "text-property/anchor-reference",
  ],
  properties: [
    { pageProperty: "text-property/title", required: true, many: false },
    { pageProperty: "relation-property/read-chapter-story", required: true, many: false },
    { pageProperty: "number-property/own-length", required: true, many: false },
    { pageProperty: "url-property/external-link", required: true, many: false },
    { pageProperty: "file-property/prose", required: true, many: false },
    { pageProperty: "instant-property/removed-at", required: false, many: false },
    { pageProperty: "instant-property/marked-read-at", required: false, many: false },
    { pageProperty: "page-property-entry/chronology-anchors", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A chapter has the words of the chapter's author rather than akasha's own.",
    },
    {
      invariantKind: "departure",
      statement: "A chapter is part of the one story the chapter was read in.",
    },

    {
      invariantKind: "departure",
      statement: "The source a chapter came from is the source its story names.",
    },
    {
      invariantKind: "departure",
      statement: "A chapter the source took down is kept rather than removed.",
    },
  ],
  types: "ts",
} as const satisfies PageType
