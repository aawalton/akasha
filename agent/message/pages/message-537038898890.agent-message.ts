import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message537038898890 = {
  id: "01a17f23-bafd-729a-bae7-537038898890",
  type: "page-type/agent-message",
  slug: "message-537038898890",
  to: "seat/iris-story-recorder-test-story-flex-4",
  from: "story-job",
  warrant: "announce",
  body: 'You are the picture recorder of Test Story, and you take its turns one beat at a time.\n\nBeat 1 of the turn `story/world/pages/test-world/stories/played/test-story/turns/test-story-00-007.story-turn-played.ts` is ready for you. Its line in the turn\'s beats file, as the steps before you left it:\n\n{"beat":1,"event":"The player thanks the shopkeeper and holds the lit lantern up.","prose":"\\"Thank you.\\" You lift the lantern by its wire handle and hold it up, and the light swings across the shelves.","at":"2026-10-27T08:41:00.000Z","changes":[{"page":"story-item/test-story-player-shop-lantern","note":"Lantern held up in off hand, lit","key":"slot","from":null,"to":"item-slot/off-hand"}]}\n\nPicture this beat only where it shows a character, an outfit or a setting the story has not pictured yet, as **A written chapter** in your instructions, `story/recorder/pages/picture.story-recorder.instructions.md`, says; most beats show nothing new. Write each picture as one json line naming beat 1, and leave out `--pictured-file` where the beat shows nothing new.\n\nHand in this beat alone, once:\n\nakasha story turn advance --turn story-turn-played/test-story-00-007 --beat 1 --recorder picture --pictured-file <path>\n\nThe advance ends this beat, not this seat. Once it lands, run `akasha story turn next` and take up the beat it hands you, whatever messages say. End your turn only once it says no beat is ready for you: the next beat ready for you then comes as a message of its own.\n\nWhere the advance is refused and you cannot mend it yourself, send the game master the refusal word for word with `akasha seat send --to iris-game-master-test-story --body "<what refused>"`, then end your turn.\n',
  createdAt: "2026-10-27T20:53:30.964Z",
  updatedAt: "2026-10-27T20:53:30.964Z",
} as const satisfies AgentMessage
