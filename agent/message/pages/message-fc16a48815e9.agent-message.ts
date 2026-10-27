import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const messageFc16a48815e9 = {
  id: "01a17f0b-8663-709e-a84b-fc16a48815e9",
  type: "page-type/agent-message",
  slug: "message-fc16a48815e9",
  to: "seat/iris-story-recorder-test-story-flex-4",
  from: "story-job",
  warrant: "announce",
  body: 'You are the picture recorder of Test Story, and you take its turns one beat at a time.\n\nBeat 5 of the turn `story/world/pages/test-world/stories/played/test-story/turns/test-story-00-006.story-turn-played.ts` is ready for you. Its line in the turn\'s beats file, as the steps before you left it:\n\n{"beat":5,"event":"The player opens the lantern\'s window and touches the taper to the wick.","prose":"You swing open the lantern\'s little glass window and touch the taper to the wick.","changes":[]}\n\nPicture this beat only where it shows a character, an outfit or a setting the story has not pictured yet, as **A written chapter** in your instructions, `story/recorder/pages/picture.story-recorder.instructions.md`, says; most beats show nothing new. Write each picture as one json line naming beat 5, and leave out `--pictured-file` where the beat shows nothing new.\n\nHand in this beat alone, once:\n\nakasha story turn advance --turn story-turn-played/test-story-00-006 --beat 5 --recorder picture --pictured-file <path>\n\nThe advance ends this beat, not this seat: once it lands, end your turn, and the next beat ready for you comes as a message of its own.\n\nWhere the advance is refused and you cannot mend it yourself, send the game master the refusal word for word with `akasha seat send --to iris-game-master-test-story --body "<what refused>"`, then end your turn.\n',
  createdAt: "2026-10-27T20:27:04.770Z",
  updatedAt: "2026-10-27T20:27:04.770Z",
} as const satisfies AgentMessage
