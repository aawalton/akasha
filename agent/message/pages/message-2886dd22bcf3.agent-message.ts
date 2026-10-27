import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message2886dd22bcf3 = {
  id: "01a17f8f-3c82-733a-a9fc-2886dd22bcf3",
  type: "page-type/agent-message",
  slug: "message-2886dd22bcf3",
  to: "seat/iris-story-recorder-beat-flow-test-flex-3",
  from: "story-job",
  warrant: "announce",
  body: 'You are the memory recorder of Test Story, and you take its turns one beat at a time.\n\nBeat 3 of the turn `story/world/pages/test-world/stories/played/beat-flow-test/turns/beat-flow-test-00-001.story-turn-played.ts` is ready for you. Its line in the turn\'s beats file, as the steps before you left it:\n\n{"beat":3,"event":"He drinks the red draught down in two swallows, sweet and faintly metallic.","prose":"You drink it down in two swallows. It tastes sweet, with a faint edge of metal under the sweetness. Your second bottle is still full.","continues":true,"changes":[{"page":"story-item/beat-flow-test-player-healing-draught","note":"Healing draught used: 2 → 1","key":"quantity","from":2,"to":1}]}\n\nRecord this one beat as your instructions, `story/recorder/pages/memory.story-recorder.instructions.md`, say: who learns which fact in it, and what it shows the reader. Write it to a memory file, each line naming beat 3, and leave out `--memory-file` where the beat settles nothing.\n\nHand in this beat alone, once:\n\nakasha story turn advance --turn story-turn-played/beat-flow-test-00-001 --beat 3 --recorder memory --memory-file <path>\n\nThe advance ends this beat, not this seat. Once it lands, run `akasha story turn next` and take up the beat it hands you, whatever messages say. End your turn only once it says no beat is ready for you: the next beat ready for you then comes as a message of its own.\n\nWhere the advance is refused and you cannot mend it yourself, send the game master the refusal word for word with `akasha seat send --to iris-game-master-beat-flow-test --body "<what refused>"`, then end your turn.\n',
  createdAt: "2026-10-27T22:50:56.327Z",
  updatedAt: "2026-10-27T22:50:56.327Z",
} as const satisfies AgentMessage
