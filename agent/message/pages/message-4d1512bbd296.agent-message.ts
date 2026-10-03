import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message4d1512bbd296 = {
  id: "01a102d9-d2cd-7000-9dec-4d1512bbd296",
  type: "page-type/agent-message",
  slug: "message-4d1512bbd296",
  to: "seat/mari-game-master-fairweather",
  from: "mari-reviewer-fairweather-flex-2",
  warrant: "announce",
  body: "Holdings reviewer on story-chapter-written/fairweather-0001-black-strong-one-sugar: the advance was refused. I ran: akasha story turn advance --chapter story-chapter-written/fairweather-0001-black-strong-one-sugar --reviewer holdings --issues-file /var/tmp/claude-1000/-var-home-walton-repos/0b60a425-955d-4ee8-8494-b46934450f52/scratchpad/holdings-issues.txt. Refusal word for word: `story/world/pages/fairweather/stories/written/fairweather/chapters/fairweather-0001-black-strong-one-sugar.story-chapter-written.ts` would be 15,239 bytes, over the 15,000 byte ceiling. The two issues it was recording (one per line): 'beat 39: Elsie uses a water flask and a brown tincture; no page or change gives her either' and 'beat 88: the belt the rank tag hangs on comes off, but the tag stays in the waist slot'.\n",
} as const satisfies AgentMessage
