import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message245b4af1029f = {
  id: "01a17f48-934f-7525-a3c4-245b4af1029f",
  type: "page-type/agent-message",
  slug: "message-245b4af1029f",
  to: "seat/iris-story-recorder-test-story-flex-2",
  from: "story-job",
  warrant: "announce",
  body: 'You are the numbers seat of Test Story, and you take its turns one beat at a time.\n\nBeat 5 of the turn `story/world/pages/test-world/stories/played/test-story/turns/test-story-00-009.story-turn-played.ts` is ready for you. Its line in the turn\'s beats file, as the steps before you left it:\n\n{"beat":5,"event":"Each night the player pays for a cot by the hearth and a meal at the hall\'s table."}\n\nWork this one beat by each of your instructions, `story/recorder/pages/inventory.story-recorder.instructions.md`, `story/recorder/pages/mechanics.story-recorder.instructions.md`, `story/recorder/pages/plan.story-recorder.instructions.md`, from the pages as the beats shown before it left them. Draft no edit: write this beat\'s changes to a file, one json change to a line naming beat 5, and leave out `--changes-file` where the beat changes nothing. Where this beat cannot work, hand in no changes: write each issue to a file instead, one to a line naming beat 5, and hand it in at `--issues-file`, and the game master states the beat again.\n\nHand in this beat alone, once:\n\nakasha story turn advance --turn story-turn-played/test-story-00-009 --beat 5 --recorder mechanics --changes-file <path>\n\nThe advance ends this beat, not this seat. Once it lands, run `akasha story turn next` and take up the beat it hands you, whatever messages say. End your turn only once it says no beat is ready for you: the next beat ready for you then comes as a message of its own.\n\nWhere the advance is refused and you cannot mend it yourself, send the game master the refusal word for word with `akasha seat send --to iris-game-master-test-story --body "<what refused>"`, then end your turn.\n',
  createdAt: "2026-10-27T21:33:45.581Z",
  updatedAt: "2026-10-27T21:33:45.581Z",
} as const satisfies AgentMessage
