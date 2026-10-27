import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message6560ff343fe7 = {
  id: "01a17f99-be7a-75db-80d7-6560ff343fe7",
  type: "page-type/agent-message",
  slug: "message-6560ff343fe7",
  to: "seat/iris-story-recorder-beat-flow-test-flex-3",
  from: "story-job",
  warrant: "announce",
  body: 'You are the memory recorder of Test Story, and you take its turns one beat at a time.\n\nBeat 5 of the turn `story/world/pages/test-world/stories/played/beat-flow-test/turns/beat-flow-test-00-002.story-turn-played.ts` is ready for you. Its line in the turn\'s beats file, as the steps before you left it:\n\n{"beat":5,"event":"Far below, the water lies still and clear, a pale disc of sky on its face.","prose":"Far below, the water lies still and clear, with a pale disc of sky on its face.","continues":true,"at":"2026-11-06T09:37:00.000Z","changes":[]}\n\nRecord this one beat as your instructions, `story/recorder/pages/memory.story-recorder.instructions.md`, say: who learns which fact in it, and what it shows the reader. Write it to a memory file, each line naming beat 5, and leave out `--memory-file` where the beat settles nothing.\n\nHand in this beat alone, once:\n\nakasha story turn advance --turn story-turn-played/beat-flow-test-00-002 --beat 5 --recorder memory --memory-file <path>\n\nThe advance ends this beat, not this seat. Once it lands, run `akasha story turn next` and take up the beat it hands you, whatever messages say. End your turn only once it says no beat is ready for you: the next beat ready for you then comes as a message of its own.\n\nWhere the advance is refused and you cannot mend it yourself, send the game master the refusal word for word with `akasha seat send --to iris-game-master-beat-flow-test --body "<what refused>"`, then end your turn.\n',
  createdAt: "2026-10-27T23:02:25.041Z",
  updatedAt: "2026-10-27T23:02:25.041Z",
} as const satisfies AgentMessage
