import type { Finding } from "../finding.page-type.ts"

export const streamingSubscriptionsUnreviewed = {
  id: "01a06555-9f3e-7d7f-a678-37d3c2771482",
  pageTypeSlug: "finding",
  slug: "streaming-subscriptions-unreviewed",
  domainSlug: "domain/all-about-alan",
  claim:
    "Four streaming subscriptions — Netflix, Disney+, Crunchyroll and YouTube Premium — all sit at a D grade as convenience purchases in Alan's software audit, and one or two of them are probably redundant against the others. Nothing has compared what each costs against what it delivers, and the whole cluster ranks low for remediation despite being among the easiest things to cancel.",
  evidence:
    "My own reading of Abby's backlog at `~/abby-backlog-2026-08-06/`, migrated here as a finding. Carried in `backlog/personal-freedom.md` line 26 as `VENDOR/streaming-audit` (was item 5), citing `notes/software-and-saas.md` for the four D grades and recording the remediation priority as low.\n\nWhat I did not measure: I did not read the software-and-SaaS note, so the four services and their grades are the backlog's account. \"Probably redundant\" is the item's own hedge, not a comparison anyone has run — no overlap analysis exists in what I read. My last clause about ease of cancellation is my own reading and is not in the item.",
} as const satisfies Finding
