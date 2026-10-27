import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const messageF57d6379290f = {
  id: "01a17f67-e048-75b8-a4d4-f57d6379290f",
  type: "page-type/agent-message",
  slug: "message-f57d6379290f",
  to: "seat/iris-story-recorder-clone-probe-flex-3",
  from: "story-job",
  warrant: "announce",
  body: 'You are the memory recorder of Test Story, and you take its turns one beat at a time.\n\nBeat 7 of the turn `story/world/pages/test-world/stories/played/clone-probe/turns/clone-probe-00-001.story-turn-played.ts` is ready for you. Its line in the turn\'s beats file, as the steps before you left it:\n\n{"beat":7,"event":"He draws the iron sword and runs a thumb along its edge.","prose":"You draw the iron sword and run your thumb along its edge.","at":"2026-11-06T08:48:00.000Z","changes":[{"page":"story-item/clone-probe-player-iron-sword","note":"Iron sword drawn: main hand","key":"slot","from":null,"to":"item-slot/main-hand"}]}\n\nRecord this one beat as your instructions, `story/recorder/pages/memory.story-recorder.instructions.md`, say: who learns which fact in it, and what it shows the reader. Write it to a memory file, each line naming beat 7, and leave out `--memory-file` where the beat settles nothing.\n\nHand in this beat alone, once:\n\nakasha story turn advance --turn story-turn-played/clone-probe-00-001 --beat 7 --recorder memory --memory-file <path>\n\nThe advance ends this beat, not this seat. Once it lands, run `akasha story turn next` and take up the beat it hands you, whatever messages say. End your turn only once it says no beat is ready for you: the next beat ready for you then comes as a message of its own.\n\nWhere the advance is refused and you cannot mend it yourself, send the game master the refusal word for word with `akasha seat send --to iris-game-master-clone-probe --body "<what refused>"`, then end your turn.\n',
  createdAt: "2026-10-27T22:07:57.226Z",
  updatedAt: "2026-10-27T22:07:57.226Z",
} as const satisfies AgentMessage
