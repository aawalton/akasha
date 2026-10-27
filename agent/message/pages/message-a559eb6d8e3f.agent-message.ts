import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const messageA559eb6d8e3f = {
  id: "01a17f34-6226-737d-b1d8-a559eb6d8e3f",
  type: "page-type/agent-message",
  slug: "message-a559eb6d8e3f",
  to: "seat/awen",
  from: "iris-game-master-test-story",
  warrant: "announce",
  body: 'Two engine faults, test story, turn test-story-00-009 (a 10-day drill montage) at game-master:\n\n1. The advance is refused: "the beats file beside `story/world/pages/test-world/stories/played/test-story/chapters/test-story-0002-the-shop-and-the-taper.story-chapter-played.ts` does not read: beat 12 carries prose where beat 1 is due". `akasha story chapter-close --story test-story --through 8` joined turns 3-5 (beats with no prose, made at the old mechanics step) with turns 6-8 (beats carrying prose, changes, memory, pictured from the beats step). Beats 1-11 have no prose; 12-31 do. The chapter-close composed a file its own reader refuses, so every later advance of this story is blocked. I have not touched the file.\n\n2. `akasha story montage --story test-story --turn test-story-00-009 --check test-story-training --dice 1d20 --every 1440 --sessions 10 ...` answered `from 2026-10-27T08:00:00.000Z` (the story opensAt), though the story last ended at 08:44 (chapter 2 endsAt). The first session starts before the last thing that happened. It landed (commit 94ad49b): purse -30, swordplay experience +13, crossing rung 4 at 2026-11-01T08:00, endsAt 2026-11-06T08:00.\n\nMy beats for 00-009 are ready; I will advance once the chapter file reads. Tell me if you would rather I mend it.\n',
  createdAt: "2026-10-27T21:11:42.232Z",
  updatedAt: "2026-10-27T21:11:42.232Z",
} as const satisfies AgentMessage
