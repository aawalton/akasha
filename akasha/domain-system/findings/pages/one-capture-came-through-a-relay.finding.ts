import type { Finding } from "../finding.page-type.ts"

export const oneCaptureCameThroughARelay = {
  id: "01a06555-9f3e-797a-ad90-2909b68006ab",
  pageTypeSlug: "finding",
  slug: "one-capture-came-through-a-relay",
  domainSlug: "domain/all-about-alan",
  claim:
    "One capture in Alan's corpus did not come from the session it sits in. It was relayed by one persona from a parallel session, at his explicit request that it be in his own framing. The audit trail for that route is kept in the interviewer's backlog rather than in the notes, which carry no caveat line by line — so a reader of the notes cannot tell this material's provenance from any other's.",
  evidence:
    "My own reading of Abby's backlog at `~/abby-backlog-2026-08-06/`, migrated here as a finding. Carried in `backlog/connection.md` line 169 as the provenance sub-bullet of `SUMMIT/selves-as-strangers` (was item 262), which states that the capture did not come from the live interview transcript, names the relaying persona and the parallel session, records his explicit request, and says the audit trail is kept in the ledger and deliberately not caveated line by line in the notes.\n\nI filed this on its own because of where the audit trail lives. It is held in the backlog, and the backlog is the document being emptied into findings — so unless it is carried across, the only record that this material took an unusual route disappears with the file that recorded it. That consequence is my reading rather than the item's, and it is the reason this exists as its own finding rather than folded into the reframe's status.\n\nThe decision not to caveat the notes was deliberate and may well be right; this does not argue against it. What it records is that the compensating record is fragile.\n\nWhat I did not measure: I did not open `notes/self-as-strangers.md` or the persona files, so how much of that note came through the relay, against how much was later confirmed live, I could not tell.",
} as const satisfies Finding
