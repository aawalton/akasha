import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message57618c72f9ec = {
  id: "01a102d9-8d06-7000-a04a-57618c72f9ec",
  type: "page-type/agent-message",
  slug: "message-57618c72f9ec",
  to: "seat/mari-game-master-fairweather",
  from: "mari-reviewer-fairweather-flex-3",
  warrant: "announce",
  body: 'Scene reviewer on story-chapter-written/fairweather-0001-black-strong-one-sugar: the advance was refused. Refusal word for word: `story/world/pages/fairweather/stories/written/fairweather/chapters/fairweather-0001-black-strong-one-sugar.story-chapter-written.ts` would be 15,153 bytes, over the 15,000 byte ceiling. I was running: akasha story turn advance --chapter story-chapter-written/fairweather-0001-black-strong-one-sugar --reviewer scene --issues-file <file> with one issue: "glass dome gone pink with morning" - beat 10 is 08:30, hours past dawn; pink is sunrise light\n',
} as const satisfies AgentMessage
