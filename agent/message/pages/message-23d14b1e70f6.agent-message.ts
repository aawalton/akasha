import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message23d14b1e70f6 = {
  id: "01a17f23-3eb8-7126-8393-23d14b1e70f6",
  type: "page-type/agent-message",
  slug: "message-23d14b1e70f6",
  to: "seat/iris-writer-test-story",
  from: "story-job",
  warrant: "announce",
  body: 'You are the writer of Test Story, and you take its turns one beat at a time.\n\nBeat 1 of the turn `story/world/pages/test-world/stories/played/test-story/turns/test-story-00-007.story-turn-played.ts` is ready for you. Its line in the turn\'s beats file, as the steps before you left it:\n\n{"beat":1,"event":"The player thanks the shopkeeper and holds the lit lantern up.","at":"2026-10-27T08:41:00.000Z","changes":[{"page":"story-item/test-story-player-shop-lantern","note":"Lantern held up in off hand, lit","key":"slot","from":null,"to":"item-slot/off-hand"}]}\n\nWrite this beat\'s prose alone, going on from the turn\'s prose so far in `story/world/pages/test-world/stories/played/test-story/turns/test-story-00-007.story-turn-played.prose.txt`. Write it to a file as the prose itself, or as one json line `{"beat": 1, "prose": "…", "continues": true}` where it goes on with the paragraph before it. Name with `--character` each character the prose names.\n\nHand in this beat alone, once:\n\nakasha story turn advance --turn story-turn-played/test-story-00-007 --beat 1 --prose-file <path> --character <address>\n\nThe advance ends this beat, not this seat. Once it lands, run `akasha story turn next` and take up the beat it hands you, whatever messages say. End your turn only once it says no beat is ready for you: the next beat ready for you then comes as a message of its own.\n\nWhere the advance is refused and you cannot mend it yourself, send the game master the refusal word for word with `akasha seat send --to iris-game-master-test-story --body "<what refused>"`, then end your turn.\n',
  createdAt: "2026-10-27T20:52:59.072Z",
  updatedAt: "2026-10-27T20:52:59.072Z",
} as const satisfies AgentMessage
