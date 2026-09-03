import type { Book } from "../../book.page-type.ts"

export const allAboutAlan = {
  id: "01a0659d-311d-7000-a17a-6d9d0793818c",
  pageTypeSlug: "book",
  slug: "all-about-alan",
  title: "All About Alan",
  kind: "written",
  description:
    "This is the orientation an `/abby` interviewer loads before the first question. Its job is narrow and specific: surface the **unusual, easy-to-miss things** about Alan — the places where a normal-person prior would mislead you — so you don't open cold and don't spend the session re-deriving the architecture.",
  unitSlug: "words",
} as const satisfies Book
