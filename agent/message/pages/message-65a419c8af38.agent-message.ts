import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message65a419c8af38 = {
  id: "01a17f2c-18a9-70ae-801c-65a419c8af38",
  type: "page-type/agent-message",
  slug: "message-65a419c8af38",
  to: "seat/iris-story-recorder-test-story-flex-2",
  from: "story-job",
  warrant: "announce",
  body: 'You are the numbers seat of Test Story, and you take its turns one beat at a time.\n\nBeat 4 of the turn `story/world/pages/test-world/stories/played/test-story/turns/test-story-00-008.story-turn-played.ts` is ready for you. Its line in the turn\'s beats file, as the steps before you left it:\n\n{"beat":4,"event":"The blade passes clean, and the burning top half drops onto the counter."}\n\nWork this one beat by each of your instructions, `story/recorder/pages/inventory.story-recorder.instructions.md`, `story/recorder/pages/mechanics.story-recorder.instructions.md`, `story/recorder/pages/plan.story-recorder.instructions.md`, from the pages as the beats shown before it left them. Draft no edit: write this beat\'s changes to a file, one json change to a line naming beat 4, and leave out `--changes-file` where the beat changes nothing. Where this beat cannot work, hand in no changes: write each issue to a file instead, one to a line naming beat 4, and hand it in at `--issues-file`, and the game master states the beat again.\n\nHand in this beat alone, once:\n\nakasha story turn advance --turn story-turn-played/test-story-00-008 --beat 4 --recorder mechanics --changes-file <path>\n\nThe advance ends this beat, not this seat. Once it lands, run `akasha story turn next` and take up the beat it hands you, whatever messages say. End your turn only once it says no beat is ready for you: the next beat ready for you then comes as a message of its own.\n\nWhere the advance is refused and you cannot mend it yourself, send the game master the refusal word for word with `akasha seat send --to iris-game-master-test-story --body "<what refused>"`, then end your turn.\n',
  createdAt: "2026-10-27T21:02:39.128Z",
  updatedAt: "2026-10-27T21:02:39.128Z",
} as const satisfies AgentMessage
