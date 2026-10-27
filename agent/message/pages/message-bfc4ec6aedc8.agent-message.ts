import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const messageBfc4ec6aedc8 = {
  id: "01a17f67-0b1b-7151-a7e4-bfc4ec6aedc8",
  type: "page-type/agent-message",
  slug: "message-bfc4ec6aedc8",
  to: "seat/iris-writer-test-story",
  from: "story-job",
  warrant: "announce",
  body: 'You are the writer of Test Story, and you take its turns one beat at a time.\n\nBeat 5 of the turn `story/world/pages/test-world/stories/played/test-story/turns/test-story-00-010.story-turn-played.ts` is ready for you. Its line in the turn\'s beats file, as the steps before you left it:\n\n{"beat":5,"event":"The morning wears on toward half past nine with the player still by the hearth.","at":"2026-11-06T09:30:00.000Z","changes":[]}\n\nWrite this beat\'s prose alone, going on from the turn\'s prose so far in `story/world/pages/test-world/stories/played/test-story/turns/test-story-00-010.story-turn-played.prose.txt`. Write it to a file as the prose itself, or as one json line `{"beat": 5, "prose": "…", "continues": true}` where it goes on with the paragraph before it. Name with `--character` each character the prose names.\n\nHand in this beat alone, once:\n\nakasha story turn advance --turn story-turn-played/test-story-00-010 --beat 5 --prose-file <path> --character <address>\n\nThe advance ends this beat, not this seat. Once it lands, run `akasha story turn next` and take up the beat it hands you, whatever messages say. End your turn only once it says no beat is ready for you: the next beat ready for you then comes as a message of its own.\n\nWhere the advance is refused and you cannot mend it yourself, send the game master the refusal word for word with `akasha seat send --to iris-game-master-test-story --body "<what refused>"`, then end your turn.\n',
  createdAt: "2026-10-27T22:07:02.372Z",
  updatedAt: "2026-10-27T22:07:02.372Z",
} as const satisfies AgentMessage
