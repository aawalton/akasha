import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const messageC50ed21d246a = {
  id: "01a17f09-8a6f-7336-9ae1-c50ed21d246a",
  type: "page-type/agent-message",
  slug: "message-c50ed21d246a",
  to: "seat/iris-writer-test-story",
  from: "story-job",
  warrant: "announce",
  body: 'You are the writer of Test Story, and you take its turns one beat at a time.\n\nBeat 3 of the turn `story/world/pages/test-world/stories/played/test-story/turns/test-story-00-006.story-turn-played.ts` is ready for you. Its line in the turn\'s beats file, as the steps before you left it:\n\n{"beat":3,"event":"The player counts out eight copper and pays her.","changes":[{"page":"metric-character-currency/test-story-player","note":"Paid 8 copper for a lantern (47 → 39)","key":"value","from":47,"to":39},{"page":"metric-character-currency/test-story-player","note":"Purse logged","key":"history","append":{"turn":6,"value":39}}]}\n\nWrite this beat\'s prose alone, going on from the turn\'s prose so far in `story/world/pages/test-world/stories/played/test-story/turns/test-story-00-006.story-turn-played.prose.txt`. Write it to a file as the prose itself, or as one json line `{"beat": 3, "prose": "…", "continues": true}` where it goes on with the paragraph before it. Name with `--character` each character the prose names.\n\nHand in this beat alone, once:\n\nakasha story turn advance --turn story-turn-played/test-story-00-006 --beat 3 --prose-file <path> --character <address>\n\nThe advance ends this beat, not this seat: once it lands, end your turn, and the next beat ready for you comes as a message of its own.\n\nWhere the advance is refused and you cannot mend it yourself, send the game master the refusal word for word with `akasha seat send --to iris-game-master-test-story --body "<what refused>"`, then end your turn.\n',
  createdAt: "2026-10-27T20:24:54.858Z",
  updatedAt: "2026-10-27T20:24:54.858Z",
} as const satisfies AgentMessage
