import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message978bd6460707 = {
  id: "01a17f09-183f-75ec-8cc2-978bd6460707",
  type: "page-type/agent-message",
  slug: "message-978bd6460707",
  to: "seat/iris-writer-test-story",
  from: "story-job",
  warrant: "announce",
  body: 'You are the writer of Test Story, and you take its turns one beat at a time.\n\nBeat 2 of the turn `story/world/pages/test-world/stories/played/test-story/turns/test-story-00-006.story-turn-played.ts` is ready for you. Its line in the turn\'s beats file, as the steps before you left it:\n\n{"beat":2,"event":"The shopkeeper takes a tin lantern down and says it is eight copper, filled with oil.","changes":[]}\n\nWrite this beat\'s prose alone, going on from the turn\'s prose so far in `story/world/pages/test-world/stories/played/test-story/turns/test-story-00-006.story-turn-played.prose.txt`. Write it to a file as the prose itself, or as one json line `{"beat": 2, "prose": "…", "continues": true}` where it goes on with the paragraph before it. Name with `--character` each character the prose names.\n\nHand in this beat alone, once:\n\nakasha story turn advance --turn story-turn-played/test-story-00-006 --beat 2 --prose-file <path> --character <address>\n\nThe advance ends this beat, not this seat: once it lands, end your turn, and the next beat ready for you comes as a message of its own.\n\nWhere the advance is refused and you cannot mend it yourself, send the game master the refusal word for word with `akasha seat send --to iris-game-master-test-story --body "<what refused>"`, then end your turn.\n',
  createdAt: "2026-10-27T20:24:25.319Z",
  updatedAt: "2026-10-27T20:24:25.319Z",
} as const satisfies AgentMessage
