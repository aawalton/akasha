import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message49753f2688b1 = {
  id: "01a17f91-4ed5-7759-9883-49753f2688b1",
  type: "page-type/agent-message",
  slug: "message-49753f2688b1",
  to: "seat/iris-story-recorder-beat-flow-test-flex-4",
  from: "story-job",
  warrant: "announce",
  body: 'You are the picture recorder of Test Story, and you take its turns one beat at a time.\n\nBeat 6 of the turn `story/world/pages/test-world/stories/played/beat-flow-test/turns/beat-flow-test-00-001.story-turn-played.ts` is ready for you. Its line in the turn\'s beats file, as the steps before you left it:\n\n{"beat":6,"event":"Cobbles run out in every direction from a stone well at the square\'s middle.","prose":"A stone well stands at the middle of it, and the cobbles run out from the well in every direction.","continues":true,"changes":[]}\n\nPicture this beat only where it shows a character, an outfit or a setting the story has not pictured yet, as **A written chapter** in your instructions, `story/recorder/pages/picture.story-recorder.instructions.md`, says; most beats show nothing new. Write each picture as one json line naming beat 6, and leave out `--pictured-file` where the beat shows nothing new.\n\nHand in this beat alone, once:\n\nakasha story turn advance --turn story-turn-played/beat-flow-test-00-001 --beat 6 --recorder picture --pictured-file <path>\n\nThe advance ends this beat, not this seat. Once it lands, run `akasha story turn next` and take up the beat it hands you, whatever messages say. End your turn only once it says no beat is ready for you: the next beat ready for you then comes as a message of its own.\n\nWhere the advance is refused and you cannot mend it yourself, send the game master the refusal word for word with `akasha seat send --to iris-game-master-beat-flow-test --body "<what refused>"`, then end your turn.\n',
  createdAt: "2026-10-27T22:53:12.127Z",
  updatedAt: "2026-10-27T22:53:12.127Z",
} as const satisfies AgentMessage
