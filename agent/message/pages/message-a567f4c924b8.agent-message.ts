import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const messageA567f4c924b8 = {
  id: "01a17fbd-3f11-77a7-9e88-a567f4c924b8",
  type: "page-type/agent-message",
  slug: "message-a567f4c924b8",
  to: "seat/iris-writer-test-story",
  from: "story-job",
  warrant: "announce",
  body: 'You are the writer of Test Story, and you take its turns one beat at a time.\n\nBeat 3 of the turn `story/world/pages/test-world/stories/played/test-story/turns/test-story-00-012.story-turn-played.ts` is ready for you. Its line in the turn\'s beats file, as the steps before you left it:\n\n{"beat":3,"event":"By the morning after, a second day of drill is done and a second night\'s board paid.","at":"2026-11-10T09:30:00.000Z","changes":[{"page":"metric-character-currency/test-story-player","note":"Second night of board: 3 coin (30 → 27)","key":"value","from":30,"to":27,"outcome":5},{"page":"character-skill/test-story-player-swordplay","note":"Swordplay +1 from the second day of drill (38 → 39)","key":"experience","from":38,"to":39,"outcome":6}]}\n\nWrite this beat\'s prose alone, going on from the turn\'s prose so far in `story/world/pages/test-world/stories/played/test-story/turns/test-story-00-012.story-turn-played.prose.txt`. Write it to a file as the prose itself, or as one json line `{"beat": 3, "prose": "…", "continues": true}` where it goes on with the paragraph before it. Name with `--character` each character the prose names.\n\nHand in this beat alone, once:\n\nakasha story turn advance --turn story-turn-played/test-story-00-012 --beat 3 --prose-file <path> --character <address>\n\nThe advance ends this beat, not this seat. Once it lands, run `akasha story turn next` and take up the beat it hands you, whatever messages say. End your turn only once it says no beat is ready for you: the next beat ready for you then comes as a message of its own.\n\nWhere the advance is refused and you cannot mend it yourself, send the game master the refusal word for word with `akasha seat send --to iris-game-master-test-story --body "<what refused>"`, then end your turn.\n',
  createdAt: "2026-10-27T23:41:11.720Z",
  updatedAt: "2026-10-27T23:41:11.720Z",
} as const satisfies AgentMessage
