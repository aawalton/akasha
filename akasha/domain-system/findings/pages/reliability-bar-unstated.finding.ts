import type { Finding } from "../finding.page-type.ts"

export const reliabilityBarUnstated = {
  id: "01a06555-9f3e-7a46-a9db-b3e0271aaefa",
  pageTypeSlug: "finding",
  slug: "reliability-bar-unstated",
  domainSlug: "domain/all-about-alan",
  claim:
    "Alan's framework grades organisations on trust in detail and states no reliability bar at all — no uptime floor, no target for mean time between failures, no statement that a given dependency must be at least as reliable as some named thing. The identity-recovery anchor is where the omission binds, being the first dependency whose limiting constraint is reliability rather than trust: an anchor he trusts entirely is useless at the moment it is unreachable.",
  evidence:
    "My own reading of Abby's backlog at `~/abby-backlog-2026-08-06/`, migrated here as a finding. Carried in `backlog/personal-freedom.md` line 53 as `FRAME/reliability-bar` (was item 61), surfaced from the threads section of `notes/identity-recovery-anchor.md`, and composing with `notes/grading-scale.md` and `notes/ranking-criterion.md`.\n\nWhat I did not measure: I did not read any of those notes, so that no reliability bar exists anywhere in the framework is the item's claim rather than a search I ran. My final clause about an anchor being useless when unreachable is my own illustration of why reliability binds here, not the item's wording.",
} as const satisfies Finding
