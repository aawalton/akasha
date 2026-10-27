import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message20e703ecab5c = {
  id: "01a17f97-aaed-72cf-86ec-20e703ecab5c",
  type: "page-type/agent-message",
  slug: "message-20e703ecab5c",
  to: "seat/iris-story-recorder-beat-flow-test-flex-3",
  from: "story-job",
  warrant: "announce",
  body: 'You are the memory recorder of Test Story, and you take its turns one beat at a time.\n\nBeat 1 of the turn `story/world/pages/test-world/stories/played/beat-flow-test/turns/beat-flow-test-00-002.story-turn-played.ts` is ready for you. Its line in the turn\'s beats file, as the steps before you left it:\n\n{"beat":1,"event":"He crosses the cobbles from where he stood to the well at the square\'s middle.","prose":"You walk across the cobbles to the well at the middle of the square.","at":"2026-11-06T09:35:00.000Z","place":"place/test-world-square","changes":[]}\n\nRecord this one beat as your instructions, `story/recorder/pages/memory.story-recorder.instructions.md`, say: who learns which fact in it, and what it shows the reader. Write it to a memory file, each line naming beat 1, and leave out `--memory-file` where the beat settles nothing.\n\nHand in this beat alone, once:\n\nakasha story turn advance --turn story-turn-played/beat-flow-test-00-002 --beat 1 --recorder memory --memory-file <path>\n\nThe advance ends this beat, not this seat. Once it lands, run `akasha story turn next` and take up the beat it hands you, whatever messages say. End your turn only once it says no beat is ready for you: the next beat ready for you then comes as a message of its own.\n\nWhere the advance is refused and you cannot mend it yourself, send the game master the refusal word for word with `akasha seat send --to iris-game-master-beat-flow-test --body "<what refused>"`, then end your turn.\n',
  createdAt: "2026-10-27T23:00:08.963Z",
  updatedAt: "2026-10-27T23:00:08.963Z",
} as const satisfies AgentMessage
