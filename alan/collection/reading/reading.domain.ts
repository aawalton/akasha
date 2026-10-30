import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const reading = {
  id: "01a0657b-06a5-7f75-b22c-a538bfe3ba53",
  type: "page-type/domain",
  slug: "reading",
  definition: "how the next thing for Alan to read is chosen",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "readings", scope: "domain/reading" },
  ],
  parts: [
    "module/chapter-choosing",
    "module/reading-shapes",
    "module/resume-chapter",
    "module/story-catalog",
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
  createdAt: "2026-09-03T04:15:56.581Z",
  updatedAt: "2026-10-30T16:57:49.989Z",
} as const satisfies Domain
