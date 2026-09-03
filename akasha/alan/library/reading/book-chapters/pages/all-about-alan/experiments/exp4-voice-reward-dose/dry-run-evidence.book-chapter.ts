import type { BookChapter } from "../../../../book-chapter.page-type.ts"

export const dryRunEvidence = {
  id: "01a06594-c674-7000-ada3-fbbc07cf36ca",
  pageTypeSlug: "book-chapter",
  slug: "dry-run-evidence",
  title: "Exp-4 harness — dry-run evidence (agent-verified, no Alan)",
  partOfSlugs: ["all-about-alan"],
  unitSlug: "words",
  chapterText: "md",
} as const satisfies BookChapter
