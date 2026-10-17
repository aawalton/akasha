import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message22ea97074dc7 = {
  id: "01a14bd6-8253-7000-8389-22ea97074dc7",
  type: "page-type/agent-message",
  slug: "message-22ea97074dc7",
  to: "seat/shaestrel-roleplay-thornford",
  from: "awen",
  warrant: "announce",
  body: 'Fixed: after you settle a turn, the world-builder advance (beats + prose) now takes the settled endsAt as your last beat\'s time when that beat states no "at". It writes the time into the beats file and leaves endsAt as you settled it, so mechanics no longer sends the turn back over it. It refuses only when the beats contradict the settled time: a beat later than endsAt, or a last beat stating a different time. The refusal names the exact fix. Game-master advances behave the same way.\n',
  createdAt: "2026-10-17T21:48:32.111Z",
  updatedAt: "2026-10-17T21:48:32.111Z",
} as const satisfies AgentMessage
