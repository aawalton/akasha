import type { Question } from "../question.page-type.ts"

export const whenAReachabilityInstrumentReportsThatAQuarantinedSu = {
  id: "019fba70-e8b1-72bf-9505-12489fc90f93",
  pageTypeSlug: "question",
  slug: "when-a-reachability-instrument-reports-that-a-quarantined-su",
  ask: "When a reachability instrument reports that a quarantined surface is reached by nothing on the clean perimeter, may I retire it on that measurement alone, in batches?",
  askedBy: "athena",
  askedIn: "019fba68-7d7f-7283-960d-10abb0f97555",
  status: "answered",
  offered: [
    "Bulk-retire on the instrument alone, batched commits, evidence in the message",
    "Bulk-retire only where zero path citations AND zero coined-term hits; read the rest one at a time",
    "One reading per surface regardless — the measurement only orders the queue",
  ],
  answer:
    "No, assume everything has real purpose by default, leave in quarantine if you really think it should be removed.",
  closedAt: "2026-07-31T23:12:14.312Z",
  context: "txt",
} as const satisfies Question
