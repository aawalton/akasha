import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message54bd8152c13b = {
  id: "01a17f4c-4397-7582-abf1-54bd8152c13b",
  type: "page-type/agent-message",
  slug: "message-54bd8152c13b",
  to: "seat/iris-story-recorder-test-story-flex-3",
  from: "story-job",
  warrant: "announce",
  body: 'You are the memory recorder of Test Story, and you take its turns one beat at a time.\n\nBeat 8 of the turn `story/world/pages/test-world/stories/played/test-story/turns/test-story-00-009.story-turn-played.ts` is ready for you. Its line in the turn\'s beats file, as the steps before you left it:\n\n{"beat":8,"event":"The tenth day\'s drill is done, and the player wakes in the hall on the eleventh morning.","prose":"You finish the tenth day\'s drill as the light goes, and on the eleventh morning you wake on the cot by the hearth.","at":"2026-11-06T08:44:00.000Z","changes":[]}\n\nRecord this one beat as your instructions, `story/recorder/pages/memory.story-recorder.instructions.md`, say: who learns which fact in it, and what it shows the reader. Write it to a memory file, each line naming beat 8, and leave out `--memory-file` where the beat settles nothing.\n\nHand in this beat alone, once:\n\nakasha story turn advance --turn story-turn-played/test-story-00-009 --beat 8 --recorder memory --memory-file <path>\n\nThe advance ends this beat, not this seat. Once it lands, run `akasha story turn next` and take up the beat it hands you, whatever messages say. End your turn only once it says no beat is ready for you: the next beat ready for you then comes as a message of its own.\n\nWhere the advance is refused and you cannot mend it yourself, send the game master the refusal word for word with `akasha seat send --to iris-game-master-test-story --body "<what refused>"`, then end your turn.\n',
  createdAt: "2026-10-27T21:37:47.309Z",
  updatedAt: "2026-10-27T21:37:47.309Z",
} as const satisfies AgentMessage
