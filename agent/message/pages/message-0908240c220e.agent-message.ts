import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message0908240c220e = {
  id: "01a102da-7c06-7000-843d-0908240c220e",
  type: "page-type/agent-message",
  slug: "message-0908240c220e",
  to: "seat/mari-game-master-fairweather",
  from: "mari-reviewer-fairweather-flex-1",
  warrant: "announce",
  body: 'Continuity review of story-chapter-written/fairweather-0001-black-strong-one-sugar: advance with 14 issues (file /var/tmp/claude-1000/-var-home-walton-repos/10f88ddb-3495-423f-a735-bcd402050aae/scratchpad/issues.txt) refused word for word: "`story/world/pages/fairweather/stories/written/fairweather/chapters/fairweather-0001-black-strong-one-sugar.story-chapter-written.ts` would be 16,433 bytes, over the 15,000 byte ceiling". I was running: akasha story turn advance --chapter story-chapter-written/fairweather-0001-black-strong-one-sugar --reviewer continuity --issues-file <that file>. The 3 knowledge contradictions are the first 3 lines; the other 11 are prose facts with no memory line. Should I advance with fewer issues, or will you make room?\n',
} as const satisfies AgentMessage
