import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message3cf19043766f = {
  id: "01a17f68-151f-73e5-bddf-3cf19043766f",
  type: "page-type/agent-message",
  slug: "message-3cf19043766f",
  to: "seat/iris-story-recorder-clone-probe-flex-4",
  from: "story-job",
  warrant: "announce",
  body: 'You are the picture recorder of Test Story, and you take its turns one beat at a time.\n\nBeat 8 of the turn `story/world/pages/test-world/stories/played/clone-probe/turns/clone-probe-00-001.story-turn-played.ts` is ready for you. Its line in the turn\'s beats file, as the steps before you left it:\n\n{"beat":8,"event":"The edge is even along its length, no nick or roll to it; the leather grip sits firm.","prose":"It runs even from hilt to point, without a nick or a rolled spot anywhere along it, and the leather grip sits firm in your hand.","continues":true,"changes":[]}\n\nPicture this beat only where it shows a character, an outfit or a setting the story has not pictured yet, as **A written chapter** in your instructions, `story/recorder/pages/picture.story-recorder.instructions.md`, says; most beats show nothing new. Write each picture as one json line naming beat 8, and leave out `--pictured-file` where the beat shows nothing new.\n\nHand in this beat alone, once:\n\nakasha story turn advance --turn story-turn-played/clone-probe-00-001 --beat 8 --recorder picture --pictured-file <path>\n\nThe advance ends this beat, not this seat. Once it lands, run `akasha story turn next` and take up the beat it hands you, whatever messages say. End your turn only once it says no beat is ready for you: the next beat ready for you then comes as a message of its own.\n\nWhere the advance is refused and you cannot mend it yourself, send the game master the refusal word for word with `akasha seat send --to iris-game-master-clone-probe --body "<what refused>"`, then end your turn.\n',
  createdAt: "2026-10-27T22:08:10.530Z",
  updatedAt: "2026-10-27T22:08:10.530Z",
} as const satisfies AgentMessage
