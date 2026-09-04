import type { Finding } from "../finding.page-type.ts"

export const voiceRuleStateUnwritten = {
  id: "01a06555-9f3f-7015-add0-9a005a7c155d",
  pageTypeSlug: "finding",
  slug: "voice-rule-state-unwritten",
  domainSlug: "domain/all-about-alan",
  claim:
    "The Voice rule on `domains/all-about-alan.md` describes a state its corpus is not in, and no Intent entry says so. 186 of the 217 files under `notes/` name Alan in the third person. Read as a rule over new writes the document is coherent as it stands. Read as a rule over the corpus, `domains/domain-intent.md` describes precisely the entry that is absent — a state the domain should be in, not yet true, leaving once it is.",
  evidence:
    "Raised by a review-instructions seat on `domains/all-about-alan.md`, which did not add an Intent entry because which reading is meant rests on judgment rather than on an instrument.\n\nThe count — 186 of 217 files in `notes/` naming Alan in the third person — is the reviewer's, reported to me. I did not run it. The reviewer separately opened two of those notes and quoted them in the course of a different repair, so at least that pair is verified by it firsthand.\n\nNot measured: whether the third-person notes predate the rule, which would settle the reading without anyone judging it. No commit history was read against the rule or against the notes.",
} as const satisfies Finding
