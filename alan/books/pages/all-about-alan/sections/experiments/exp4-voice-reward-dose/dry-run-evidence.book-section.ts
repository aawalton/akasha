import type { BookSection } from "../../../../../../library/reading/book-sections/book-section.page-type.ts"

export const dryRunEvidence = {
  id: "01a06594-c674-7000-ada3-fbbc07cf36ca",
  pageTypeSlug: "book-section",
  type: "book-section",
  slug: "dry-run-evidence",
  title: "Exp-4 harness — dry-run evidence (agent-verified, no Alan)",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan", "book-section/experiments/exp4-voice-reward-dose"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
