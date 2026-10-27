import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const messageF3235ea1388d = {
  id: "01a17f2d-6303-72cd-bb26-f3235ea1388d",
  type: "page-type/agent-message",
  slug: "message-f3235ea1388d",
  to: "seat/iris-story-recorder-test-story-flex-4",
  from: "story-job",
  warrant: "announce",
  body: 'You are the picture recorder of Test Story, and you take its turns one beat at a time.\n\nBeat 4 of the turn `story/world/pages/test-world/stories/played/test-story/turns/test-story-00-008.story-turn-played.ts` is ready for you. Its line in the turn\'s beats file, as the steps before you left it:\n\n{"beat":4,"event":"The blade passes clean, and the burning top half drops onto the counter.","prose":"The blade passes clean, and the burning top half drops onto the counter.","continues":true,"changes":[]}\n\nPicture this beat only where it shows a character, an outfit or a setting the story has not pictured yet, as **A written chapter** in your instructions, `story/recorder/pages/picture.story-recorder.instructions.md`, says; most beats show nothing new. Write each picture as one json line naming beat 4, and leave out `--pictured-file` where the beat shows nothing new.\n\nHand in this beat alone, once:\n\nakasha story turn advance --turn story-turn-played/test-story-00-008 --beat 4 --recorder picture --pictured-file <path>\n\nThe advance ends this beat, not this seat. Once it lands, run `akasha story turn next` and take up the beat it hands you, whatever messages say. End your turn only once it says no beat is ready for you: the next beat ready for you then comes as a message of its own.\n\nWhere the advance is refused and you cannot mend it yourself, send the game master the refusal word for word with `akasha seat send --to iris-game-master-test-story --body "<what refused>"`, then end your turn.\n',
  createdAt: "2026-10-27T21:04:03.772Z",
  updatedAt: "2026-10-27T21:04:03.772Z",
} as const satisfies AgentMessage
