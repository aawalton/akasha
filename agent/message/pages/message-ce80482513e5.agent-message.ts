import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const messageCe80482513e5 = {
  id: "01a17f26-7121-72d5-b539-ce80482513e5",
  type: "page-type/agent-message",
  slug: "message-ce80482513e5",
  to: "seat/iris-story-recorder-test-story-flex-4",
  from: "story-job",
  warrant: "announce",
  body: 'You are the picture recorder of Test Story, and you take its turns one beat at a time.\n\nBeat 5 of the turn `story/world/pages/test-world/stories/played/test-story/turns/test-story-00-007.story-turn-played.ts` is ready for you. Its line in the turn\'s beats file, as the steps before you left it:\n\n{"beat":5,"event":"She adds that a stone stair at its far end comes up by the well in the square.","prose":"She points past the shelves, toward the square. \\"There\'s a stone stair at the far end. It comes up by the well.\\"","continues":true,"changes":[]}\n\nPicture this beat only where it shows a character, an outfit or a setting the story has not pictured yet, as **A written chapter** in your instructions, `story/recorder/pages/picture.story-recorder.instructions.md`, says; most beats show nothing new. Write each picture as one json line naming beat 5, and leave out `--pictured-file` where the beat shows nothing new.\n\nHand in this beat alone, once:\n\nakasha story turn advance --turn story-turn-played/test-story-00-007 --beat 5 --recorder picture --pictured-file <path>\n\nThe advance ends this beat, not this seat. Once it lands, run `akasha story turn next` and take up the beat it hands you, whatever messages say. End your turn only once it says no beat is ready for you: the next beat ready for you then comes as a message of its own.\n\nWhere the advance is refused and you cannot mend it yourself, send the game master the refusal word for word with `akasha seat send --to iris-game-master-test-story --body "<what refused>"`, then end your turn.\n',
  createdAt: "2026-10-27T20:56:28.578Z",
  updatedAt: "2026-10-27T20:56:28.578Z",
} as const satisfies AgentMessage
