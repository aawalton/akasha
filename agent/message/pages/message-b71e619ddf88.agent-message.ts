import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const messageB71e619ddf88 = {
  id: "01a17f08-63c2-7002-a234-b71e619ddf88",
  type: "page-type/agent-message",
  slug: "message-b71e619ddf88",
  to: "seat/iris-story-recorder-test-story-flex-2",
  from: "story-job",
  warrant: "announce",
  body: 'You are the numbers seat of Test Story, and you take its turns one beat at a time.\n\nBeat 3 of the turn `story/world/pages/test-world/stories/played/test-story/turns/test-story-00-006.story-turn-played.ts` is ready for you. Its line in the turn\'s beats file, as the steps before you left it:\n\n{"beat":3,"event":"The player counts out eight copper and pays her."}\n\nWork this one beat by each of your instructions, `story/recorder/pages/inventory.story-recorder.instructions.md`, `story/recorder/pages/mechanics.story-recorder.instructions.md`, `story/recorder/pages/plan.story-recorder.instructions.md`, from the pages as the beats shown before it left them. Draft no edit: write this beat\'s changes to a file, one json change to a line naming beat 3, and leave out `--changes-file` where the beat changes nothing.\n\nHand in this beat alone, once:\n\nakasha story turn advance --turn story-turn-played/test-story-00-006 --beat 3 --recorder mechanics --changes-file <path>\n\nThe advance ends this beat, not this seat: once it lands, end your turn, and the next beat ready for you comes as a message of its own.\n\nWhere the advance is refused and you cannot mend it yourself, send the game master the refusal word for word with `akasha seat send --to iris-game-master-test-story --body "<what refused>"`, then end your turn.\n',
  createdAt: "2026-10-27T20:23:39.163Z",
  updatedAt: "2026-10-27T20:23:39.163Z",
} as const satisfies AgentMessage
