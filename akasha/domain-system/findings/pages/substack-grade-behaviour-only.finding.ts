import type { Finding } from "../finding.page-type.ts"

export const substackGradeBehaviourOnly = {
  id: "01a06555-9f3e-7f8b-b64f-c39ee0fc48a7",
  pageTypeSlug: "finding",
  slug: "substack-grade-behaviour-only",
  domainSlug: "domain/all-about-alan",
  claim:
    "Substack holds a B in Alan's information audit purely on how it behaves now, with no structural insulation behind the grade — nothing in its ownership or governance stops it turning. Under his own framework any capture signal resets that trust to zero, and the signals that would count are known: changes to content-moderation policy, extraction moves such as mandatory paid tiers or fee shifts, and features that lock writers or readers in.",
  evidence:
    "My own reading of Abby's backlog at `~/abby-backlog-2026-08-06/`, migrated here as a finding. Carried in `backlog/personal-freedom.md` line 70 as `WATCH/substack-signals` (was item 52), citing the Substack entry in `notes/information-and-media.md` for the current-behaviour-only grade and `notes/capture-events.md` for the reset rule. It composes with the capture-monitor item I filed separately.\n\nI kept it apart from the fold on capture detection because it is a standing property of one graded vendor rather than a gap in the detection machinery.\n\nWhat I did not measure: I read neither note, so the B grade and its lack of structural insulation are the backlog's account. I did not check Substack's current ownership or policies, so nothing here says whether any of the three signals has since landed.",
} as const satisfies Finding
