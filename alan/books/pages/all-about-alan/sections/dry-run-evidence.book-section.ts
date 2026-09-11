import type { BookSection } from "akasha/alan/library/reading/book-sections/book-section.page-type.types.ts"

export const dryRunEvidence = {
  id: "01a06594-c674-7000-ada3-fbbc07cf36ca",
  type: "book-section",
  slug: "dry-run-evidence",
  title: "Exp-4 harness — dry-run evidence (agent-verified, no Alan)",
  sectionOf: "all-about-alan",
  partOfCollections: ["all-about-alan", "book-section/experiments/exp4-voice-reward-dose"],
  unit: "words",
  chapterText: "md",
} as const satisfies BookSection
