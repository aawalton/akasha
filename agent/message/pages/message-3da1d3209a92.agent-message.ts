import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message3da1d3209a92 = {
  id: "01a17f66-bbb1-77ee-b7ec-3da1d3209a92",
  type: "page-type/agent-message",
  slug: "message-3da1d3209a92",
  to: "seat/iris-story-recorder-clone-probe-flex-4",
  from: "story-job",
  warrant: "announce",
  body: 'You are the picture recorder of Test Story, and you take its turns one beat at a time.\n\nBeat 7 of the turn `story/world/pages/test-world/stories/played/clone-probe/turns/clone-probe-00-001.story-turn-played.ts` is ready for you. Its line in the turn\'s beats file, as the steps before you left it:\n\n{"beat":7,"event":"He draws the iron sword and runs a thumb along its edge.","prose":"You draw the iron sword and run your thumb along its edge.","at":"2026-11-06T08:48:00.000Z","changes":[{"page":"story-item/clone-probe-player-iron-sword","note":"Iron sword drawn: main hand","key":"slot","from":null,"to":"item-slot/main-hand"}]}\n\nPicture this beat only where it shows a character, an outfit or a setting the story has not pictured yet, as **A written chapter** in your instructions, `story/recorder/pages/picture.story-recorder.instructions.md`, says; most beats show nothing new. Write each picture as one json line naming beat 7, and leave out `--pictured-file` where the beat shows nothing new.\n\nHand in this beat alone, once:\n\nakasha story turn advance --turn story-turn-played/clone-probe-00-001 --beat 7 --recorder picture --pictured-file <path>\n\nThe advance ends this beat, not this seat. Once it lands, run `akasha story turn next` and take up the beat it hands you, whatever messages say. End your turn only once it says no beat is ready for you: the next beat ready for you then comes as a message of its own.\n\nWhere the advance is refused and you cannot mend it yourself, send the game master the refusal word for word with `akasha seat send --to iris-game-master-clone-probe --body "<what refused>"`, then end your turn.\n',
  createdAt: "2026-10-27T22:06:42.120Z",
  updatedAt: "2026-10-27T22:06:42.120Z",
} as const satisfies AgentMessage
