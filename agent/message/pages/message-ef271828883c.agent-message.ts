import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const messageEf271828883c = {
  id: "01a17f62-5707-7196-8de2-ef271828883c",
  type: "page-type/agent-message",
  slug: "message-ef271828883c",
  to: "seat/iris-story-recorder-clone-probe-flex-2",
  from: "story-job",
  warrant: "announce",
  body: 'You are the numbers seat of Test Story, and you take its turns one beat at a time.\n\nBeat 7 of the turn `story/world/pages/test-world/stories/played/clone-probe/turns/clone-probe-00-001.story-turn-played.ts` is ready for you. Its line in the turn\'s beats file, as the steps before you left it:\n\n{"beat":7,"event":"He draws the iron sword and runs a thumb along its edge.","at":"2026-11-06T08:48:00.000Z"}\n\nWork this one beat by each of your instructions, `story/recorder/pages/inventory.story-recorder.instructions.md`, `story/recorder/pages/mechanics.story-recorder.instructions.md`, `story/recorder/pages/plan.story-recorder.instructions.md`, from the pages as the beats shown before it left them. Draft no edit: write this beat\'s changes to a file, one json change to a line naming beat 7, and leave out `--changes-file` where the beat changes nothing. Where this beat cannot work, hand in no changes: write each issue to a file instead, one to a line naming beat 7, and hand it in at `--issues-file`, and the game master states the beat again.\n\nHand in this beat alone, once:\n\nakasha story turn advance --turn story-turn-played/clone-probe-00-001 --beat 7 --recorder mechanics --changes-file <path>\n\nThe advance ends this beat, not this seat. Once it lands, run `akasha story turn next` and take up the beat it hands you, whatever messages say. End your turn only once it says no beat is ready for you: the next beat ready for you then comes as a message of its own.\n\nWhere the advance is refused and you cannot mend it yourself, send the game master the refusal word for word with `akasha seat send --to iris-game-master-clone-probe --body "<what refused>"`, then end your turn.\n',
  createdAt: "2026-10-27T22:01:54.083Z",
  updatedAt: "2026-10-27T22:01:54.083Z",
} as const satisfies AgentMessage
