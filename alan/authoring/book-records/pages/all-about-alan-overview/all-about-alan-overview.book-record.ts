import type { BookRecord } from "../../book-record.page-type.ts"

export const allAboutAlanOverview = {
  id: "01a0657d-b91d-7600-a17e-e29618171ec3",
  pageTypeSlug: "book-record",
  slug: "all-about-alan-overview",
  title: "All About Alan — Overview",
  definition: "the distillation of who Alan is that an interview opens on",
  bookSlug: "all-about-alan",
  brief:
    "Pre-compiled orientation to who Alan is — the standing distillation every /abby session loads at startup so the interviewer walks in already knowing the unusual, easy-to-miss shape of Alan's psychology and situation. Third-person briefing for the interviewer, not a note for Future-Alan. Every claim traces to a canonical-home note linked at the point of use; this file invents nothing.",
  keptBy: "the archivist",
  writing: "md",
} as const satisfies BookRecord
