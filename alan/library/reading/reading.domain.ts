import type { Domain } from "akasha/domains/domain.page-type.types.ts"

export const reading = {
  id: "01a0657b-06a5-7f75-b22c-a538bfe3ba53",
  type: "domain",
  slug: "reading",
  definition: "how the next thing for Alan to read is chosen",
  parts: [
    "module/chapter-choosing",
    "module/offline-reading",
    "module/reading-shapes",
    "module/resume-chapter",
    "module/story-catalog",
    "module/story-choosing",
    "page-type/author",
    "page-type/author-collection",
    "page-type/book",
    "page-type/book-collection",
    "page-type/book-section",
    "page-type/book-series",
    "page-type/gbww-reading",
    "page-type/scripture-collection",
    "page-type/scripture-passage",
  ],
} as const satisfies Domain
