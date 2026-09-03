import type { Finding } from "../finding.page-type.ts"

export const infoDietPostureUnreviewed = {
  id: "01a06555-9f3e-77bc-8bb7-3b711ff6df75",
  pageTypeSlug: "finding",
  slug: "info-diet-posture-unreviewed",
  domainSlug: "domain/all-about-alan",
  claim:
    "Alan's information diet is sparse by design — no news, no podcasts, almost no information-side social media — and it is the highest-leverage move available in that domain, already in place. What it is not is a permanent commitment: it is an assessment of what he needs now, and no review revisits whether each eliminated category should stay eliminated when circumstances change, such as an election cycle, a professional pivot, or a health event in the household.",
  evidence:
    "My own reading of Abby's backlog at `~/abby-backlog-2026-08-06/`, migrated here as a finding. Carried in `backlog/personal-freedom.md` line 71 as `WATCH/info-diet-review` (was item 54), citing the caveats section of `notes/information-diet.md`, proposing an annual review as the default, and to land as a recurring entry once a cadence is settled.\n\nWhat I did not measure: I did not read `notes/information-diet.md`, so the diet's contents, its ranking as highest-leverage, and the current-state-not-commitment framing are all the backlog's account. The three circumstances that would prompt a re-introduction are the item's examples. That no review is running is what the item's open status implies rather than something I confirmed.",
} as const satisfies Finding
