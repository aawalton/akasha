import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const messageF2c1f216d21d = {
  id: "01a17f2e-e675-7477-a8d1-f2c1f216d21d",
  type: "page-type/agent-message",
  slug: "message-f2c1f216d21d",
  to: "seat/iris-story-recorder-test-story-flex-3",
  from: "story-job",
  warrant: "announce",
  body: 'You are the memory recorder of Test Story, and you take its turns one beat at a time.\n\nBeat 7 of the turn `story/world/pages/test-world/stories/played/test-story/turns/test-story-00-008.story-turn-played.ts` is ready for you. Its line in the turn\'s beats file, as the steps before you left it:\n\n{"beat":7,"event":"She looks from the burning half to the bare blade and asks the player what that was for.","prose":"Her eyes go from the burning half to your bare blade. \\"What was that for?\\"","continues":true,"at":"2026-10-27T08:44:00.000Z","changes":[]}\n\nRecord this one beat as your instructions, `story/recorder/pages/memory.story-recorder.instructions.md`, say: who learns which fact in it, and what it shows the reader. Write it to a memory file, each line naming beat 7, and leave out `--memory-file` where the beat settles nothing.\n\nHand in this beat alone, once:\n\nakasha story turn advance --turn story-turn-played/test-story-00-008 --beat 7 --recorder memory --memory-file <path>\n\nThe advance ends this beat, not this seat. Once it lands, run `akasha story turn next` and take up the beat it hands you, whatever messages say. End your turn only once it says no beat is ready for you: the next beat ready for you then comes as a message of its own.\n\nWhere the advance is refused and you cannot mend it yourself, send the game master the refusal word for word with `akasha seat send --to iris-game-master-test-story --body "<what refused>"`, then end your turn.\n',
  createdAt: "2026-10-27T21:05:42.915Z",
  updatedAt: "2026-10-27T21:05:42.915Z",
} as const satisfies AgentMessage
