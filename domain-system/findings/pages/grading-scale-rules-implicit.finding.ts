import type { Finding } from "../finding.page-type.ts"

export const gradingScaleRulesImplicit = {
  id: "01a06555-9f3e-72d4-8788-1ae358bfac72",
  pageTypeSlug: "finding",
  slug: "grading-scale-rules-implicit",
  domainSlug: "domain/all-about-alan",
  claim:
    "Alan's grading scale runs on rules it does not state. The mapping from component scores to a letter grade works on a worst-component rule that is implicit rather than written. Ownership structure is not scored as a dimension of its own despite doing much of the work elsewhere in the framework. No per-component band thresholds are published, so nothing says whether a low ethics score caps a grade. And the research prompt behind a grade does not check for capture signals directly.",
  evidence:
    "My own reading of Abby's backlog at `~/abby-backlog-2026-08-06/`, migrated here as a finding. This folds four items under the FRAME thread of `backlog/personal-freedom.md`, all swept 2026-07-02 and all sitting on `notes/grading-scale.md`: `score-to-grade` (line 55), `ownership-dimension` (line 56), `band-thresholds` (line 57) and `capture-signal-prompt` (line 58). Four gaps in one instrument is why I took them as one observation. The last cross-references `WATCH/ai-capture-monitor`.\n\nThe example of a threshold — ethics under fifty capping at D — is the item's own, offered as an illustration of a decision not yet made.\n\nWhat I did not measure: I did not read `notes/grading-scale.md`, so that the worst-component rule is implicit rather than stated is the backlog's reading. The third item is phrased as a decision to make rather than a gap, so \"no thresholds are published\" may understate a deliberate choice not to publish them.",
} as const satisfies Finding
