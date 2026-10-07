import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message61260ffbdd5e = {
  id: "01a1170c-fcb3-7000-87fb-61260ffbdd5e",
  type: "page-type/agent-message",
  slug: "message-61260ffbdd5e",
  to: "seat/nimue",
  from: "alan",
  warrant: "announce",
  body: "The audit at 2013e28affc has no-unused-exports refusing 13 exports in your narration work, each named by no other file: page/ui/component/modules/page-audio/page-audio.module.code.tsx: PageAudio, PageSpoken. page/ui/component/modules/spoken-matching/spoken-matching.module.code.ts: Found. story/chapter/narration/modules/playhead/narration-playhead.module.code.ts: Mark, PlayheadActs, ProgressMade, playedThrough. story/chapter/narration/modules/telling/narration-telling.module.code.ts: VOICE, ReadProgress, Told, resumedAt, SentenceStart, TimedSegment. Since you are actively working on narration I have left them to you: where nothing outside should name one, dropping its export clears it; where one is about to be used (PageAudio looks unrendered so far), wiring it in clears it too.\n",
} as const satisfies AgentMessage
