import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message841049d6531e = {
  id: "01a17f98-9d43-7135-8ff2-841049d6531e",
  type: "page-type/agent-message",
  slug: "message-841049d6531e",
  to: "seat/iris-story-recorder-beat-flow-test-flex-4",
  from: "story-job",
  warrant: "announce",
  body: 'You are the picture recorder of Test Story, and you take its turns one beat at a time.\n\nBeat 2 of the turn `story/world/pages/test-world/stories/played/beat-flow-test/turns/beat-flow-test-00-002.story-turn-played.ts` is ready for you. Its line in the turn\'s beats file, as the steps before you left it:\n\n{"beat":2,"event":"The well is a round shaft of fitted stone, its rim waist-high.","prose":"It is a round shaft of fitted stone, and its rim comes up to your waist.","continues":true,"changes":[],"memory":[{"page":"place/test-world-square","fact":"The square\'s well is a round shaft of fitted stone, its rim waist-high.","establishes":true},{"page":"place/test-world-square","fact":"The square\'s well is a round shaft of fitted stone, its rim waist-high.","learns":"character-player/beat-flow-test-player"},{"page":"place/test-world-square","fact":"The square\'s well is a round shaft of fitted stone, its rim waist-high.","shown":true}]}\n\nPicture this beat only where it shows a character, an outfit or a setting the story has not pictured yet, as **A written chapter** in your instructions, `story/recorder/pages/picture.story-recorder.instructions.md`, says; most beats show nothing new. Write each picture as one json line naming beat 2, and leave out `--pictured-file` where the beat shows nothing new.\n\nHand in this beat alone, once:\n\nakasha story turn advance --turn story-turn-played/beat-flow-test-00-002 --beat 2 --recorder picture --pictured-file <path>\n\nThe advance ends this beat, not this seat. Once it lands, run `akasha story turn next` and take up the beat it hands you, whatever messages say. End your turn only once it says no beat is ready for you: the next beat ready for you then comes as a message of its own.\n\nWhere the advance is refused and you cannot mend it yourself, send the game master the refusal word for word with `akasha seat send --to iris-game-master-beat-flow-test --body "<what refused>"`, then end your turn.\n',
  createdAt: "2026-10-27T23:01:10.969Z",
  updatedAt: "2026-10-27T23:01:10.969Z",
} as const satisfies AgentMessage
