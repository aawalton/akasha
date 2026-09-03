import type { Finding } from "../finding.page-type.ts"

export const findingsCarryAnUnsourcedDate = {
  id: "01a06555-9f3e-7e99-b8af-ba7ef9334c58",
  pageTypeSlug: "finding",
  slug: "findings-carry-an-unsourced-date",
  domainSlug: "domain/all-about-alan",
  claim:
    'Thirty-seven findings on `all-about-alan` qualify their claims with "as of 2026-07-10". That date appears nowhere in the backlog those findings were migrated from. The dates the backlog does carry are 2026-06-30, 2026-07-02, 2026-07-06, 2026-07-07 and 2026-07-11. A date attached to a claim is what tells a later reader how stale the reading is, so thirty-seven findings carry a staleness marker that traces to no source.',
  evidence:
    "My own reading, taken 2026-08-16 while verifying a delegate's report on the migration of Abby's backlog into this store.\n\nA recursive search of `findings/` for `2026-07-10` returns thirty-seven files. The same search over `~/abby-backlog-2026-08-06/` returns nothing. The thread headings in the breakouts read \"(touched 2026-07-02)\", and the spine's own dated entries are 2026-06-30, 2026-07-02, 2026-07-07 and 2026-07-11; a tail-append in the ethics breakout carries 2026-07-06.\n\nThe delegate that first reported this had migrated only one breakout and searched only the backlog store. I confirmed both halves independently.\n\nWhat I did not measure: I did not read the thirty-seven to see whether the date is used consistently, nor whether some other register — a session transcript, an issue row, a note under `packages/books/` — carries it and was the real source. Absence from the backlog store is not absence everywhere.",
} as const satisfies Finding
