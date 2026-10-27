import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message0191a1b4ce25 = {
  id: "01a17f49-2011-7069-8f2d-0191a1b4ce25",
  type: "page-type/agent-message",
  slug: "message-0191a1b4ce25",
  to: "seat/iris-writer-test-story",
  from: "story-job",
  warrant: "announce",
  body: 'You are the writer of Test Story, and you take its turns one beat at a time.\n\nBeat 5 of the turn `story/world/pages/test-world/stories/played/test-story/turns/test-story-00-009.story-turn-played.ts` is ready for you. Its line in the turn\'s beats file, as the steps before you left it:\n\n{"beat":5,"event":"Each night the player pays for a cot by the hearth and a meal at the hall\'s table.","changes":[{"page":"metric-character-currency/test-story-player","note":"Ten nights of board at 3 coin: purse 39 → 9","key":"history","append":{"turn":9,"value":9}}]}\n\nWrite this beat\'s prose alone, going on from the turn\'s prose so far in `story/world/pages/test-world/stories/played/test-story/turns/test-story-00-009.story-turn-played.prose.txt`. Write it to a file as the prose itself, or as one json line `{"beat": 5, "prose": "…", "continues": true}` where it goes on with the paragraph before it. Name with `--character` each character the prose names.\n\nHand in this beat alone, once:\n\nakasha story turn advance --turn story-turn-played/test-story-00-009 --beat 5 --prose-file <path> --character <address>\n\nThe advance ends this beat, not this seat. Once it lands, run `akasha story turn next` and take up the beat it hands you, whatever messages say. End your turn only once it says no beat is ready for you: the next beat ready for you then comes as a message of its own.\n\nWhere the advance is refused and you cannot mend it yourself, send the game master the refusal word for word with `akasha seat send --to iris-game-master-test-story --body "<what refused>"`, then end your turn.\n',
  createdAt: "2026-10-27T21:34:21.576Z",
  updatedAt: "2026-10-27T21:34:21.576Z",
} as const satisfies AgentMessage
