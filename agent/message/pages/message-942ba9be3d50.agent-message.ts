import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message942ba9be3d50 = {
  id: "01a17fbd-0740-75a2-bb08-942ba9be3d50",
  type: "page-type/agent-message",
  slug: "message-942ba9be3d50",
  to: "seat/iris-story-recorder-test-story-flex-3",
  from: "story-job",
  warrant: "announce",
  body: 'You are the memory recorder of Test Story, and you take its turns one beat at a time.\n\nBeat 2 of the turn `story/world/pages/test-world/stories/played/test-story/turns/test-story-00-012.story-turn-played.ts` is ready for you. Its line in the turn\'s beats file, as the steps before you left it:\n\n{"beat":2,"event":"By the next morning, a first full day of drill is done and a first night\'s board paid.","prose":"You drill the rest of that day, and the cuts run clean until the light goes. That night you pay for supper and the cot by the hearth, and in the morning you are back on the floor.","at":"2026-11-09T09:30:00.000Z","changes":[{"page":"metric-character-currency/test-story-player","note":"First night of board: 3 coin (33 → 30)","key":"value","from":33,"to":30,"outcome":2},{"page":"character-skill/test-story-player-swordplay","note":"Swordplay +2 from a good day of drill (36 → 38)","key":"experience","from":36,"to":38,"outcome":3}]}\n\nRecord this one beat as your instructions, `story/recorder/pages/memory.story-recorder.instructions.md`, say: who learns which fact in it, and what it shows the reader. Write it to a memory file, each line naming beat 2, and leave out `--memory-file` where the beat settles nothing.\n\nRead each instructions file named above with `akasha read --file-path <path>` before this beat, never from memory: it may have changed, and one unchanged costs a line.\n\nHand in this beat alone, once:\n\nakasha story turn advance --turn story-turn-played/test-story-00-012 --beat 2 --recorder memory --memory-file <path>\n\nThe advance ends this beat, not this seat. Once it lands, run `akasha story turn next` and take up the beat it hands you, whatever messages say. End your turn only once it says no beat is ready for you: the next beat ready for you then comes as a message of its own.\n\nWhere the advance is refused and you cannot mend it yourself, send the game master the refusal word for word with `akasha seat send --to iris-game-master-test-story --body "<what refused>"`, then end your turn.\n',
  createdAt: "2026-10-27T23:40:57.427Z",
  updatedAt: "2026-10-27T23:40:57.427Z",
} as const satisfies AgentMessage
