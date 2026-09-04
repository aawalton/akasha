import type { Finding } from "../finding.page-type.ts"

export const trustCriterionSignalsAbsent = {
  id: "01a06555-9f3f-7b76-91ab-9a44b88c9009",
  pageTypeSlug: "finding",
  slug: "trust-criterion-signals-absent",
  domainSlug: "domain/all-about-alan",
  claim:
    "Alan's trust criterion decides which organisations he depends on, and the signals that would let anyone apply it are unenumerated — ownership structure, how employees are treated, transparency, longevity, governance, and evidence of resisting pressure. Two further questions sit open on it: whether trust in an organisation can be established faster than over years, and whether the rule by which he learns to trust a person is the same mechanism as the rule for an organisation.",
  evidence:
    "My own reading of Abby's backlog at `~/abby-backlog-2026-08-06/`, migrated here as a finding. This folds three items under the FRAME thread of `backlog/personal-freedom.md`, all sitting on `notes/trust-criterion.md`: `trust-signals` (line 38, was item 9), `compressed-timeline` (line 39, sweep 2026-07-02) and `safety-estimator-analog` (line 40, sweep 2026-07-02). All three are gaps the same note flags in its own threads section, which is why I took them as one observation. The third cross-references the audhd SOCIAL thread on the safety estimator.\n\nWhat I did not measure: I did not read `notes/trust-criterion.md`, so both the criterion's current content and its self-flagged gaps are the backlog's account. The six signal categories are the item's enumeration of what should be written, not a list that exists. I did not read the audhd breakout, where the safety-estimator side of the third question sits.",
} as const satisfies Finding
