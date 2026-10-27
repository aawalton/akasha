import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message5136daba2e1a = {
  id: "01a17fbe-0f7a-7419-8e7a-5136daba2e1a",
  type: "page-type/agent-message",
  slug: "message-5136daba2e1a",
  to: "seat/iris-writer-test-story",
  from: "story-job",
  warrant: "announce",
  body: 'You are the writer of Test Story, and you take its turns one beat at a time.\n\nBeat 4 of the turn `story/world/pages/test-world/stories/played/test-story/turns/test-story-00-012.story-turn-played.ts` is ready for you. Its line in the turn\'s beats file, as the steps before you left it:\n\n{"beat":4,"event":"A third day of drill and a third night\'s board; by morning, swordplay climbs a rung.","at":"2026-11-11T09:30:00.000Z","changes":[{"page":"metric-character-currency/test-story-player","note":"Third night of board: 3 coin (27 → 24)","key":"value","from":27,"to":24,"outcome":8},{"page":"metric-character-currency/test-story-player","note":"Purse logged","key":"history","append":{"turn":12,"value":24}},{"page":"character-skill/test-story-player-swordplay","note":"Swordplay +2, rung 4 reached (39 → 41)","key":"experience","from":39,"to":41,"outcome":9}]}\n\nWrite this beat\'s prose alone, going on from the turn\'s prose so far in `story/world/pages/test-world/stories/played/test-story/turns/test-story-00-012.story-turn-played.prose.txt`. Write it to a file as the prose itself, or as one json line `{"beat": 4, "prose": "…", "continues": true}` where it goes on with the paragraph before it. Name with `--character` each character the prose names.\n\nHand in this beat alone, once:\n\nakasha story turn advance --turn story-turn-played/test-story-00-012 --beat 4 --prose-file <path> --character <address>\n\nThe advance ends this beat, not this seat. Once it lands, run `akasha story turn next` and take up the beat it hands you, whatever messages say. End your turn only once it says no beat is ready for you: the next beat ready for you then comes as a message of its own.\n\nWhere the advance is refused and you cannot mend it yourself, send the game master the refusal word for word with `akasha seat send --to iris-game-master-test-story --body "<what refused>"`, then end your turn.\n',
  createdAt: "2026-10-27T23:42:05.043Z",
  updatedAt: "2026-10-27T23:42:05.043Z",
} as const satisfies AgentMessage
