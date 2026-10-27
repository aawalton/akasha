import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message4eb0107c83ad = {
  id: "01a17f64-b2f4-77a7-853a-4eb0107c83ad",
  type: "page-type/agent-message",
  slug: "message-4eb0107c83ad",
  to: "seat/iris-story-recorder-clone-probe-flex-4",
  from: "story-job",
  warrant: "announce",
  body: 'You are the picture recorder of Test Story, and you take its turns one beat at a time.\n\nBeat 3 of the turn `story/world/pages/test-world/stories/played/clone-probe/turns/clone-probe-00-001.story-turn-played.ts` is ready for you. Its line in the turn\'s beats file, as the steps before you left it:\n\n{"beat":3,"event":"A hearth burns low at the far end, cots ranged beside it where travellers sleep.","prose":"At the far end a hearth burns low, with cots ranged beside it for travellers to sleep on.","continues":true,"changes":[]}\n\nPicture this beat only where it shows a character, an outfit or a setting the story has not pictured yet, as **A written chapter** in your instructions, `story/recorder/pages/picture.story-recorder.instructions.md`, says; most beats show nothing new. Write each picture as one json line naming beat 3, and leave out `--pictured-file` where the beat shows nothing new.\n\nHand in this beat alone, once:\n\nakasha story turn advance --turn story-turn-played/clone-probe-00-001 --beat 3 --recorder picture --pictured-file <path>\n\nThe advance ends this beat, not this seat. Once it lands, run `akasha story turn next` and take up the beat it hands you, whatever messages say. End your turn only once it says no beat is ready for you: the next beat ready for you then comes as a message of its own.\n\nWhere the advance is refused and you cannot mend it yourself, send the game master the refusal word for word with `akasha seat send --to iris-game-master-clone-probe --body "<what refused>"`, then end your turn.\n',
  createdAt: "2026-10-27T22:04:33.449Z",
  updatedAt: "2026-10-27T22:04:33.449Z",
} as const satisfies AgentMessage
