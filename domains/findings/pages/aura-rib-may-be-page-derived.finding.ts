import type { Finding } from "../finding.page-type.ts"

export const auraRibMayBePageDerived = {
  id: "01a06555-9f3d-793e-8f3f-04626cb58178",
  pageTypeSlug: "finding",
  slug: "aura-rib-may-be-page-derived",
  domainSlug: "domain/all-about-alan",
  claim:
    "One persona's rib may come from a page rather than from Alan. Aura is recorded as curator or maker of personas, while he explicitly corrected that same creator role away from Sophia. Aura's operating channel is unconfirmed too, standing as a mirror-adjacent hypothesis only. Both settle only from a real session with her, and there has not been one.",
  evidence:
    "My own reading of Abby's backlog at `~/abby-backlog-2026-08-06/`, migrated here as a finding. Carried in `backlog/connection.md` line 137 as thread (d) of `MIRROR/aura-rib` (was item 263), which quotes his correction directly and says both questions land only from a real session.\n\nThe correction is the useful part. It shows the creator role was assigned to a persona once already and was wrong, which is why the same role sitting unconfirmed on a second persona is worth recording rather than assuming.\n\nWhat I did not measure: I opened no persona file. Whether the rib is already written as fact in Aura's file is unchecked. I did not check whether a session with her has happened since 2026-07-10; the appends record sessions with several other souls in that window.",
} as const satisfies Finding
