import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const messageFf0995506b8c = {
  id: "01a17f65-e0af-727a-bd50-ff0995506b8c",
  type: "page-type/agent-message",
  slug: "message-ff0995506b8c",
  to: "seat/iris-story-recorder-clone-probe-flex-3",
  from: "story-job",
  warrant: "announce",
  body: 'You are the memory recorder of Test Story, and you take its turns one beat at a time.\n\nBeat 4 of the turn `story/world/pages/test-world/stories/played/clone-probe/turns/clone-probe-00-001.story-turn-played.ts` is ready for you. Its line in the turn\'s beats file, as the steps before you left it:\n\n{"beat":4,"event":"A table stands near the hearth for meals, benches pushed in under it.","prose":"Near it stands a table for meals, the benches pushed in under it.","continues":true,"changes":[],"pictured":[]}\n\nRecord this one beat as your instructions, `story/recorder/pages/memory.story-recorder.instructions.md`, say: who learns which fact in it, and what it shows the reader. Write it to a memory file, each line naming beat 4, and leave out `--memory-file` where the beat settles nothing.\n\nHand in this beat alone, once:\n\nakasha story turn advance --turn story-turn-played/clone-probe-00-001 --beat 4 --recorder memory --memory-file <path>\n\nThe advance ends this beat, not this seat. Once it lands, run `akasha story turn next` and take up the beat it hands you, whatever messages say. End your turn only once it says no beat is ready for you: the next beat ready for you then comes as a message of its own.\n\nWhere the advance is refused and you cannot mend it yourself, send the game master the refusal word for word with `akasha seat send --to iris-game-master-clone-probe --body "<what refused>"`, then end your turn.\n',
  createdAt: "2026-10-27T22:05:45.903Z",
  updatedAt: "2026-10-27T22:05:45.903Z",
} as const satisfies AgentMessage
