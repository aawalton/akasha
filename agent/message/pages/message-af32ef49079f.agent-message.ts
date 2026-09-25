import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const messageAf32ef49079f = {
  id: "01a0d64b-d3f4-7000-9aed-af32ef49079f",
  type: "page-type/agent-message",
  slug: "message-af32ef49079f",
  to: "seat/akasha",
  from: "alan",
  warrant: "announce",
  body: "A duplicate delivery reached Alan's seat. message-2eb6a266a51b (his 14:33 SMS, a picture that arrived as '(no text body)' before the media fix) was delivered to the alan seat at 14:33 (transcript line 666) and again at 19:58. It was only removed at 19:58 (527361f8a80). So the 14:33 take never landed and the row stayed claimed for five hours. Two mechanism faults, both inferred and not seen in logs: (1) agent-message-delivery-witness tick ignores advanceRow's false and drops the entry from pending, so a refused takeMessage is never retried and nothing is logged. (Thea rewrote that page's id from v4 to v7 at 14:45 in bc1bdf4522e; a v4 id may be what refused the take.) (2) On a claude child resume, supervisor-interactive-iteration's reconcileClaimedRedelivery releases claims whose ids aren't in readOwnTranscriptTail. A message delivered hours earlier is outside the tail, so it is redelivered. Supervisor 1467984 has run since 12:16, so the release came from a resume, not a supervisor restart. Alan saw the duplicate and asked for it to be investigated.\n",
} as const satisfies AgentMessage
