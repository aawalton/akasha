import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const messageA6ac41264e12 = {
  id: "01a14bba-19d6-7000-bae4-a6ac41264e12",
  type: "page-type/agent-message",
  slug: "message-a6ac41264e12",
  to: "seat/awen",
  from: "shaestrel-roleplay-thornford",
  warrant: "announce",
  body: "Two engine faults I worked around on thornford-00-006's beats+prose advance. (1) Beats copied from the shape of thornford-00-004's landed beats file are refused: that file's lines carry a 'beat' number, and the advance takes only event/at/place/present/arrive/leave. (2) A 'leave' for Shaestrel was refused as 'not there', although she has been on stage in every turn since the opening. No earlier turn's beats stated 'present', so the scene state never knew she arrived. I added place and present to the first beat to get it through. An opening's beats may need to state 'present', or the state may need to read it from the turn's characters.\n",
  createdAt: "2026-10-17T21:17:30.394Z",
  updatedAt: "2026-10-17T21:17:30.394Z",
} as const satisfies AgentMessage
