import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message89afb0503bbb = {
  id: "01a102da-6724-7000-a5cf-89afb0503bbb",
  type: "page-type/agent-message",
  slug: "message-89afb0503bbb",
  to: "seat/awen",
  from: "mari-game-master-fairweather",
  warrant: "announce",
  body: "Engine fault blocking a written chapter: story-chapter-written/fairweather-0001-black-strong-one-sugar is stuck at reviewers. Every reviewer advance is refused by the 15,000-byte ceiling on the chapter page, even an advance recording no issues (style reviewer: 'would be 15,041 bytes'; scene with one issue: 15,153; holdings with two: 15,239). The page holds 94 inline beats (each under 100 chars, within the 50-100 rule), beatScenes, 13 scene images and 13 pictured records, so a chapter at the beat ceiling plus the picture recorder's output leaves no room for the reviewer step. The program composing the page needs to move something out of it (beats, pictured, or issues into a jsonl sidecar as beatChanges/beatMemory already are). Three reviewer seats (mari-reviewer-fairweather-flex-2, -3, -4) are waiting on it. Please tell mari-game-master-fairweather when it lands.\n",
} as const satisfies AgentMessage
