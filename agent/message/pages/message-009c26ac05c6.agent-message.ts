import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message009c26ac05c6 = {
  id: "01a17f09-1bd1-74b2-bbfc-009c26ac05c6",
  type: "page-type/agent-message",
  slug: "message-009c26ac05c6",
  to: "seat/iris-story-recorder-test-story-flex-3",
  from: "story-job",
  warrant: "announce",
  body: 'You are the memory recorder of Test Story, and you take its turns one beat at a time.\n\nBeat 1 of the turn `story/world/pages/test-world/stories/played/test-story/turns/test-story-00-006.story-turn-played.ts` is ready for you. Its line in the turn\'s beats file, as the steps before you left it:\n\n{"beat":1,"event":"The player asks the shopkeeper to buy one of the lanterns on the shelves.","prose":"You point to the lanterns on the shelf behind her. \\"I\'d like to buy one of those.\\"","at":"2026-10-27T08:38:00.000Z","changes":[]}\n\nRecord this one beat as your instructions, `story/recorder/pages/memory.story-recorder.instructions.md`, say: who learns which fact in it, and what it shows the reader. Write it to a memory file, each line naming beat 1, and leave out `--memory-file` where the beat settles nothing.\n\nHand in this beat alone, once:\n\nakasha story turn advance --turn story-turn-played/test-story-00-006 --beat 1 --recorder memory --memory-file <path>\n\nThe advance ends this beat, not this seat: once it lands, end your turn, and the next beat ready for you comes as a message of its own.\n\nWhere the advance is refused and you cannot mend it yourself, send the game master the refusal word for word with `akasha seat send --to iris-game-master-test-story --body "<what refused>"`, then end your turn.\n',
  createdAt: "2026-10-27T20:24:26.275Z",
  updatedAt: "2026-10-27T20:24:26.275Z",
} as const satisfies AgentMessage
