import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const messageEd90f6eec2bd = {
  id: "01a17f98-ed2e-778c-be72-ed90f6eec2bd",
  type: "page-type/agent-message",
  slug: "message-ed90f6eec2bd",
  to: "seat/iris-story-recorder-beat-flow-test-flex-4",
  from: "story-job",
  warrant: "announce",
  body: 'You are the picture recorder of Test Story, and you take its turns one beat at a time.\n\nBeat 3 of the turn `story/world/pages/test-world/stories/played/beat-flow-test/turns/beat-flow-test-00-002.story-turn-played.ts` is ready for you. Its line in the turn\'s beats file, as the steps before you left it:\n\n{"beat":3,"event":"He sets his hands on the cool rim and leans over to look down.","prose":"You set your hands on the rim, cool under your palms, and lean over to look down.","continues":true,"changes":[]}\n\nPicture this beat only where it shows a character, an outfit or a setting the story has not pictured yet, as **A written chapter** in your instructions, `story/recorder/pages/picture.story-recorder.instructions.md`, says; most beats show nothing new. Write each picture as one json line naming beat 3, and leave out `--pictured-file` where the beat shows nothing new.\n\nHand in this beat alone, once:\n\nakasha story turn advance --turn story-turn-played/beat-flow-test-00-002 --beat 3 --recorder picture --pictured-file <path>\n\nThe advance ends this beat, not this seat. Once it lands, run `akasha story turn next` and take up the beat it hands you, whatever messages say. End your turn only once it says no beat is ready for you: the next beat ready for you then comes as a message of its own.\n\nWhere the advance is refused and you cannot mend it yourself, send the game master the refusal word for word with `akasha seat send --to iris-game-master-beat-flow-test --body "<what refused>"`, then end your turn.\n',
  createdAt: "2026-10-27T23:01:31.441Z",
  updatedAt: "2026-10-27T23:01:31.441Z",
} as const satisfies AgentMessage
