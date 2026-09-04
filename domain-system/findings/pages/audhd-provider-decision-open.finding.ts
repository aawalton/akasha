import type { Finding } from "../finding.page-type.ts"

export const audhdProviderDecisionOpen = {
  id: "01a06555-9f3d-70c3-921d-62ef7554d9b7",
  pageTypeSlug: "finding",
  slug: "audhd-provider-decision-open",
  domainSlug: "domain/all-about-alan",
  claim:
    "Whether the household should build ongoing AuDHD-specific provider relationships is undecided, and the adolescent transitions that would want them are close: Lizzy is approaching college age and Joseph is mid-teens. The decision is genuinely two-sided — the alternative is a deliberate finding that such providers are not needed — and neither has been recorded, so what stands is neither the relationships nor the reasoning for going without them.",
  evidence:
    "My own reading of Abby's backlog at `~/abby-backlog-2026-08-06/`, migrated here as a finding. Carried in `backlog/personal-freedom.md` line 82 as `MEDS/audhd-providers` (was item 26), flagged in the open-gaps section of `notes/healthcare.md`, and recording both outcomes as valid: a provider-strategy note if the decision is to build, or additions to the audit documenting a deliberate not-needed decision otherwise.\n\nWhat I did not measure: I did not read `notes/healthcare.md`, so the gap is the backlog's account. The children's ages are as the backlog records them elsewhere in the same file, on 2026-07-02, and I did not confirm them against anything else. Nothing I read says whether the household currently sees any mental-health provider.",
} as const satisfies Finding
