import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const messageAef3f9df7912 = {
  id: "01a17f66-00fd-74cb-85e2-aef3f9df7912",
  type: "page-type/agent-message",
  slug: "message-aef3f9df7912",
  to: "seat/iris-story-recorder-test-story-flex-3",
  from: "story-job",
  warrant: "announce",
  body: 'You are the memory recorder of Test Story, and you take its turns one beat at a time.\n\nBeat 2 of the turn `story/world/pages/test-world/stories/played/test-story/turns/test-story-00-010.story-turn-played.ts` is ready for you. Its line in the turn\'s beats file, as the steps before you left it:\n\n{"beat":2,"event":"The player rests the sword arm and lets the stiffness of ten days\' drill ease.","prose":"You rest your sword arm on your knee, and the stiffness from ten days of drill starts to ease out of your shoulder.","continues":true,"changes":[]}\n\nRecord this one beat as your instructions, `story/recorder/pages/memory.story-recorder.instructions.md`, say: who learns which fact in it, and what it shows the reader. Write it to a memory file, each line naming beat 2, and leave out `--memory-file` where the beat settles nothing.\n\nHand in this beat alone, once:\n\nakasha story turn advance --turn story-turn-played/test-story-00-010 --beat 2 --recorder memory --memory-file <path>\n\nThe advance ends this beat, not this seat. Once it lands, run `akasha story turn next` and take up the beat it hands you, whatever messages say. End your turn only once it says no beat is ready for you: the next beat ready for you then comes as a message of its own.\n\nWhere the advance is refused and you cannot mend it yourself, send the game master the refusal word for word with `akasha seat send --to iris-game-master-test-story --body "<what refused>"`, then end your turn.\n',
  createdAt: "2026-10-27T22:05:54.175Z",
  updatedAt: "2026-10-27T22:05:54.175Z",
} as const satisfies AgentMessage
