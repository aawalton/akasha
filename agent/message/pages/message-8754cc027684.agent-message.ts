import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message8754cc027684 = {
  id: "01a17fbd-ba18-7314-83f8-8754cc027684",
  type: "page-type/agent-message",
  slug: "message-8754cc027684",
  to: "seat/iris-story-recorder-test-story-flex-3",
  from: "story-job",
  warrant: "announce",
  body: 'You are the memory recorder of Test Story, and you take its turns one beat at a time.\n\nBeat 3 of the turn `story/world/pages/test-world/stories/played/test-story/turns/test-story-00-012.story-turn-played.ts` is ready for you. Its line in the turn\'s beats file, as the steps before you left it:\n\n{"beat":3,"event":"By the morning after, a second day of drill is done and a second night\'s board paid.","prose":"You drill through that day too, pay for a second night at the hall, and wake to another morning.","continues":true,"at":"2026-11-10T09:30:00.000Z","changes":[{"page":"metric-character-currency/test-story-player","note":"Second night of board: 3 coin (30 → 27)","key":"value","from":30,"to":27,"outcome":5},{"page":"character-skill/test-story-player-swordplay","note":"Swordplay +1 from the second day of drill (38 → 39)","key":"experience","from":38,"to":39,"outcome":6}]}\n\nRecord this one beat as your instructions, `story/recorder/pages/memory.story-recorder.instructions.md`, say: who learns which fact in it, and what it shows the reader. Write it to a memory file, each line naming beat 3, and leave out `--memory-file` where the beat settles nothing.\n\nRead each instructions file named above with `akasha read --file-path <path>` before this beat, never from memory: it may have changed, and one unchanged costs a line.\n\nHand in this beat alone, once:\n\nakasha story turn advance --turn story-turn-played/test-story-00-012 --beat 3 --recorder memory --memory-file <path>\n\nThe advance ends this beat, not this seat. Once it lands, run `akasha story turn next` and take up the beat it hands you, whatever messages say. End your turn only once it says no beat is ready for you: the next beat ready for you then comes as a message of its own.\n\nWhere the advance is refused and you cannot mend it yourself, send the game master the refusal word for word with `akasha seat send --to iris-game-master-test-story --body "<what refused>"`, then end your turn.\n',
  createdAt: "2026-10-27T23:41:43.218Z",
  updatedAt: "2026-10-27T23:41:43.218Z",
} as const satisfies AgentMessage
