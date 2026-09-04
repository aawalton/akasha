import type { Finding } from "../finding.page-type.ts"

export const emailAnchorMigrationUnplanned = {
  id: "01a06555-9f3d-7e69-8f62-ab59579ae82d",
  pageTypeSlug: "finding",
  slug: "email-anchor-migration-unplanned",
  domainSlug: "domain/all-about-alan",
  claim:
    "Gmail is the identity-recovery anchor for most of Alan's online accounts, making a move off it a project touching email, Drive and YouTube together. The split is decided — logging in through Google stays, for want of an alternative, and only the recovery-anchor role migrates — but neither half of the execution exists: no map of which accounts anchor there, no ordering that avoids a window where an account is recoverable only through a half-migrated path, and no chosen mail stack.",
  evidence:
    "My own reading of Abby's backlog at `~/abby-backlog-2026-08-06/`, migrated here as a finding. This folds two items under the BIGTHREE thread of `backlog/personal-freedom.md`: `google-migration` (line 9, was item 3) and `self-host-email` (line 11, was item 62). The second says outright that it operationalises the recovery-anchor half of the first, and both name the same missing blast-radius map, which is why I took them as one observation. They cite `notes/identity-recovery-anchor.md` and `notes/alternatives.md`.\n\nThe alternatives note is recorded as already calling self-hosting significant enough to justify the friction, so the path is endorsed without being planned.\n\nWhat I did not measure: I read neither note. That Gmail anchors \"most\" accounts is the item's word; no count exists in what I read, and no such map has been made by anyone.",
} as const satisfies Finding
