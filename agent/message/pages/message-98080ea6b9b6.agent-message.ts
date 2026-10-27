import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message98080ea6b9b6 = {
  id: "01a17f90-34c2-724b-8312-98080ea6b9b6",
  type: "page-type/agent-message",
  slug: "message-98080ea6b9b6",
  to: "seat/iris-story-recorder-beat-flow-test-flex-4",
  from: "story-job",
  warrant: "announce",
  body: 'You are the picture recorder of Test Story, and you take its turns one beat at a time.\n\nBeat 4 of the turn `story/world/pages/test-world/stories/played/beat-flow-test/turns/beat-flow-test-00-001.story-turn-played.ts` is ready for you. Its line in the turn\'s beats file, as the steps before you left it:\n\n{"beat":4,"event":"Warmth spreads through his chest, but he has no wound for it to close.","prose":"Warmth spreads through your chest and settles there. You are not hurt, so it has no wound to close.","changes":[]}\n\nPicture this beat only where it shows a character, an outfit or a setting the story has not pictured yet, as **A written chapter** in your instructions, `story/recorder/pages/picture.story-recorder.instructions.md`, says; most beats show nothing new. Write each picture as one json line naming beat 4, and leave out `--pictured-file` where the beat shows nothing new.\n\nHand in this beat alone, once:\n\nakasha story turn advance --turn story-turn-played/beat-flow-test-00-001 --beat 4 --recorder picture --pictured-file <path>\n\nThe advance ends this beat, not this seat. Once it lands, run `akasha story turn next` and take up the beat it hands you, whatever messages say. End your turn only once it says no beat is ready for you: the next beat ready for you then comes as a message of its own.\n\nWhere the advance is refused and you cannot mend it yourself, send the game master the refusal word for word with `akasha seat send --to iris-game-master-beat-flow-test --body "<what refused>"`, then end your turn.\n',
  createdAt: "2026-10-27T22:51:59.914Z",
  updatedAt: "2026-10-27T22:51:59.914Z",
} as const satisfies AgentMessage
