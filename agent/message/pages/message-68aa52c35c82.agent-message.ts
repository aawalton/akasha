import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message68aa52c35c82 = {
  id: "01a17f0a-b1b5-7017-b2ad-68aa52c35c82",
  type: "page-type/agent-message",
  slug: "message-68aa52c35c82",
  to: "seat/iris-story-recorder-test-story-flex-3",
  from: "story-job",
  warrant: "announce",
  body: 'You are the memory recorder of Test Story, and you take its turns one beat at a time.\n\nBeat 3 of the turn `story/world/pages/test-world/stories/played/test-story/turns/test-story-00-006.story-turn-played.ts` is ready for you. Its line in the turn\'s beats file, as the steps before you left it:\n\n{"beat":3,"event":"The player counts out eight copper and pays her.","prose":"You count eight copper onto the counter, and she sweeps them into her palm.","changes":[{"page":"metric-character-currency/test-story-player","note":"Paid 8 copper for a lantern (47 → 39)","key":"value","from":47,"to":39},{"page":"metric-character-currency/test-story-player","note":"Purse logged","key":"history","append":{"turn":6,"value":39}}]}\n\nRecord this one beat as your instructions, `story/recorder/pages/memory.story-recorder.instructions.md`, say: who learns which fact in it, and what it shows the reader. Write it to a memory file, each line naming beat 3, and leave out `--memory-file` where the beat settles nothing.\n\nHand in this beat alone, once:\n\nakasha story turn advance --turn story-turn-played/test-story-00-006 --beat 3 --recorder memory --memory-file <path>\n\nThe advance ends this beat, not this seat: once it lands, end your turn, and the next beat ready for you comes as a message of its own.\n\nWhere the advance is refused and you cannot mend it yourself, send the game master the refusal word for word with `akasha seat send --to iris-game-master-test-story --body "<what refused>"`, then end your turn.\n',
  createdAt: "2026-10-27T20:26:10.176Z",
  updatedAt: "2026-10-27T20:26:10.176Z",
} as const satisfies AgentMessage
