import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message84f0f3aba3f5 = {
  id: "01a17f2f-0c22-765e-932f-84f0f3aba3f5",
  type: "page-type/agent-message",
  slug: "message-84f0f3aba3f5",
  to: "seat/iris-story-recorder-test-story-flex-4",
  from: "story-job",
  warrant: "announce",
  body: 'You are the picture recorder of Test Story, and you take its turns one beat at a time.\n\nBeat 7 of the turn `story/world/pages/test-world/stories/played/test-story/turns/test-story-00-008.story-turn-played.ts` is ready for you. Its line in the turn\'s beats file, as the steps before you left it:\n\n{"beat":7,"event":"She looks from the burning half to the bare blade and asks the player what that was for.","prose":"Her eyes go from the burning half to your bare blade. \\"What was that for?\\"","continues":true,"at":"2026-10-27T08:44:00.000Z","changes":[]}\n\nPicture this beat only where it shows a character, an outfit or a setting the story has not pictured yet, as **A written chapter** in your instructions, `story/recorder/pages/picture.story-recorder.instructions.md`, says; most beats show nothing new. Write each picture as one json line naming beat 7, and leave out `--pictured-file` where the beat shows nothing new.\n\nHand in this beat alone, once:\n\nakasha story turn advance --turn story-turn-played/test-story-00-008 --beat 7 --recorder picture --pictured-file <path>\n\nThe advance ends this beat, not this seat. Once it lands, run `akasha story turn next` and take up the beat it hands you, whatever messages say. End your turn only once it says no beat is ready for you: the next beat ready for you then comes as a message of its own.\n\nWhere the advance is refused and you cannot mend it yourself, send the game master the refusal word for word with `akasha seat send --to iris-game-master-test-story --body "<what refused>"`, then end your turn.\n',
  createdAt: "2026-10-27T21:05:54.227Z",
  updatedAt: "2026-10-27T21:05:54.227Z",
} as const satisfies AgentMessage
