import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message9cb058506bd5 = {
  id: "01a17faf-b7fc-7702-990b-9cb058506bd5",
  type: "page-type/agent-message",
  slug: "message-9cb058506bd5",
  to: "seat/iris-writer-test-story",
  from: "story-job",
  warrant: "announce",
  body: 'You are the writer of Test Story, and you take its turns one beat at a time.\n\nBeat 1 of the turn `story/world/pages/test-world/stories/played/test-story/turns/test-story-00-011.story-turn-played.ts` is ready for you. Its line in the turn\'s beats file, as the steps before you left it:\n\n{"beat":1,"event":"The player rises from the hearth and takes the sword back out onto the long stone floor.","at":"2026-11-06T09:31:00.000Z","changes":[{"page":"story-item/test-story-player-iron-sword","note":"Iron Sword drawn into main hand for drill","key":"slot","from":null,"to":"item-slot/main-hand"}]}\n\nWrite this beat\'s prose alone, going on from the turn\'s prose so far in `story/world/pages/test-world/stories/played/test-story/turns/test-story-00-011.story-turn-played.prose.txt`. Write it to a file as the prose itself, or as one json line `{"beat": 1, "prose": "…", "continues": true}` where it goes on with the paragraph before it. Name with `--character` each character the prose names.\n\nHand in this beat alone, once:\n\nakasha story turn advance --turn story-turn-played/test-story-00-011 --beat 1 --prose-file <path> --character <address>\n\nThe advance ends this beat, not this seat. Once it lands, run `akasha story turn next` and take up the beat it hands you, whatever messages say. End your turn only once it says no beat is ready for you: the next beat ready for you then comes as a message of its own.\n\nWhere the advance is refused and you cannot mend it yourself, send the game master the refusal word for word with `akasha seat send --to iris-game-master-test-story --body "<what refused>"`, then end your turn.\n',
  createdAt: "2026-10-27T23:26:25.083Z",
  updatedAt: "2026-10-27T23:26:25.083Z",
} as const satisfies AgentMessage
