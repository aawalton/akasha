import type { Finding } from "akasha/domain/finding/finding.page-type.types.ts"

export const oneCaptureCameThroughARelay = {
  id: "01a06555-9f3e-797a-ad90-2909b68006ab",
  type: "page-type/finding",
  slug: "one-capture-came-through-a-relay",
  domain: "alan-book/all-about-alan",
  claim:
    "One capture in this book did not come from the session it sits in: it was relayed by one of Alan's personas from a parallel session, at his explicit request that it reach the book in his own framing, and the material is the selves-as-strangers work. The record of that route was held in the interviewer's backlog, which no longer exists, so this finding is all that is left of it — the persona and the parallel session it named are no longer recoverable. Nothing in the book carries provenance of any kind, so no reader can tell this material's route from any other's.",
  evidence:
    "Migrated here from the interviewer's backlog, where it was the provenance sub-bullet of the `SUMMIT/selves-as-strangers` entry. That entry recorded that the capture did not come from the live interview transcript, named the relaying persona and the parallel session, recorded Alan's explicit request, and said the audit trail was kept in the ledger and deliberately not caveated note by note.\n\nThat backlog is gone. Nothing remains at the path it was read from, and I found no other record anywhere of the persona or the session it named. What it held of the route survives only in what this finding says.\n\nThe selves-as-strangers material now sits among the topics, and nothing on any of them says where it came from. An `all-about-alan-topic` carries a title, a definition, its parents, its related topics and its settled text; an `all-about-alan-question` carries a topic and an ask. Neither type has anywhere to put provenance, so no page could record the route even where someone wanted to.\n\nLeaving the notes uncaveated was deliberate and may well have been right, and this does not argue against it. What it records is that the compensating record was fragile and has now mostly gone.\n\nNot measured: how much of that material came through the relay and how much was later confirmed live, I could not tell — the entry that knew is gone.",
} as const satisfies Finding
