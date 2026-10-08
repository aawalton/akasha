import type { BookSection } from "akasha/alan/collection/reading/book-section/book-section.page-type.types.ts"

export const euResidencyRomania = {
  id: "01a06594-c68a-7007-b18b-0cbfb6c3a7f4",
  type: "page-type/book-section",
  slug: "eu-residency-romania",
  title: "Romania",
  sectionOf: "book-section/second-passport/eu-residency",
  description:
    "Romania residency paths (May 2026 snapshot). For citizenship paths, see ../citizenship/romania.md.",
  partOfCollections: ["book-section/second-passport/eu-residency", "alan-book/my-projects"],
  unit: "unit/words",
  chapterText: "md",
  createdAt: "2026-09-03T04:44:04.106Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies BookSection
