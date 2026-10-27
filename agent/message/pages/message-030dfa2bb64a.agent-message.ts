import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message030dfa2bb64a = {
  id: "01a17f09-df67-72a1-b318-030dfa2bb64a",
  type: "page-type/agent-message",
  slug: "message-030dfa2bb64a",
  to: "seat/iris-story-recorder-test-story-flex-3",
  from: "story-job",
  warrant: "announce",
  body: 'You are the memory recorder of Test Story, and you take its turns one beat at a time.\n\nBeat 2 of the turn `story/world/pages/test-world/stories/played/test-story/turns/test-story-00-006.story-turn-played.ts` is ready for you. Its line in the turn\'s beats file, as the steps before you left it:\n\n{"beat":2,"event":"The shopkeeper takes a tin lantern down and says it is eight copper, filled with oil.","prose":"She reaches up, takes a tin lantern down and sets it between you. \\"Eight copper, and that\'s with the oil in it.\\"","changes":[]}\n\nRecord this one beat as your instructions, `story/recorder/pages/memory.story-recorder.instructions.md`, say: who learns which fact in it, and what it shows the reader. Write it to a memory file, each line naming beat 2, and leave out `--memory-file` where the beat settles nothing.\n\nHand in this beat alone, once:\n\nakasha story turn advance --turn story-turn-played/test-story-00-006 --beat 2 --recorder memory --memory-file <path>\n\nThe advance ends this beat, not this seat: once it lands, end your turn, and the next beat ready for you comes as a message of its own.\n\nWhere the advance is refused and you cannot mend it yourself, send the game master the refusal word for word with `akasha seat send --to iris-game-master-test-story --body "<what refused>"`, then end your turn.\n',
  createdAt: "2026-10-27T20:25:16.252Z",
  updatedAt: "2026-10-27T20:25:16.252Z",
} as const satisfies AgentMessage
