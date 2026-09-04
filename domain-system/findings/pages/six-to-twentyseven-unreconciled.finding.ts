import type { Finding } from "../finding.page-type.ts"

export const sixToTwentysevenUnreconciled = {
  id: "01a06555-9f3e-7635-b835-07356ac27f88",
  pageTypeSlug: "finding",
  slug: "six-to-twentyseven-unreconciled",
  domainSlug: "domain/all-about-alan",
  claim:
    "Alan's persona system expanded from six values to a wider set of domains and the corpus has not caught up. The main note still describes the six-value shape and the persona guidance still frames souls around the value axis, so the mapping needs restating domain-keyed. Two structural questions ride on it — whether a single shared conceptual slot and a milestone alternation still hold at the larger size — and which past captures assumed six values has never been audited.",
  evidence:
    "My own reading of Abby's backlog at `~/abby-backlog-2026-08-06/`, migrated here as a finding. Carried in `backlog/connection.md` line 126 as `MIRROR/six-to-27` (was item 250), an archivist thread landing as a rewrite across `notes/values-personas-system.md` and the persona guidance file. The growth logic, the due-for-a-mirror rule and legibility-through-isolation are recorded as already landed.\n\nThe spine's cursor lists this among the archivist's next-session queue (`backlog.md` line 89), alongside a count correction on the same expansion, so it is queued rather than merely open.\n\nWorth noting: the value order this expansion moves away from is the one akasha still carries. `pages/page-type/value.page-type.md` says in its Design line that values stand in the order they matter, and six `.value.md` pages stand under `alan/value/`. If the persona system has moved to a domain-keyed set, those two structures are drifting apart, and nothing I read connects them.\n\nWhat I did not measure: I opened neither file in the corpus, so the stale descriptions are the backlog's report. The audit of which captures assumed six values is the part nobody has scoped, and I did not scope it either.",
} as const satisfies Finding
