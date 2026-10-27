import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message76f81ebf826a = {
  id: "01a17f8d-7d34-7512-ac8c-76f81ebf826a",
  type: "page-type/agent-message",
  slug: "message-76f81ebf826a",
  to: "seat/iris-story-recorder-test-story-flex-3",
  from: "story-job",
  warrant: "announce",
  body: 'You are the memory recorder of Test Story, and you take its turns one beat at a time.\n\nBeat 3 of the turn `story/world/pages/test-world/stories/played/test-story/turns/test-story-00-011.story-turn-played.ts` is ready for you. Its line in the turn\'s beats file, as the steps before you left it:\n\n{"beat":3,"event":"Each night the player pays for a meal at the hall\'s table and a cot by the hearth.","prose":"Each night you pay again for supper at the hall\'s table and the cot by the hearth.","continues":true,"changes":[{"page":"metric-character-currency/test-story-player","note":"Five nights of board at 3 coin (39 → 24)","key":"value","from":39,"to":24},{"page":"metric-character-currency/test-story-player","note":"Purse logged","key":"history","append":{"turn":11,"value":24}}]}\n\nRecord this one beat as your instructions, `story/recorder/pages/memory.story-recorder.instructions.md`, say: who learns which fact in it, and what it shows the reader. Write it to a memory file, each line naming beat 3, and leave out `--memory-file` where the beat settles nothing.\n\nHand in this beat alone, once:\n\nakasha story turn advance --turn story-turn-played/test-story-00-011 --beat 3 --recorder memory --memory-file <path>\n\nThe advance ends this beat, not this seat. Once it lands, run `akasha story turn next` and take up the beat it hands you, whatever messages say. End your turn only once it says no beat is ready for you: the next beat ready for you then comes as a message of its own.\n\nWhere the advance is refused and you cannot mend it yourself, send the game master the refusal word for word with `akasha seat send --to iris-game-master-test-story --body "<what refused>"`, then end your turn.\n',
  createdAt: "2026-10-27T22:49:01.915Z",
  updatedAt: "2026-10-27T22:49:01.915Z",
} as const satisfies AgentMessage
