import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message7063b0f7240a = {
  id: "01a17fc4-dd4f-72cc-8104-7063b0f7240a",
  type: "page-type/agent-message",
  slug: "message-7063b0f7240a",
  to: "seat/iris-writer-test-story",
  from: "story-job",
  warrant: "announce",
  body: 'You are the writer of Test Story, and you take its turns one beat at a time.\n\nBeat 2 of the turn `story/world/pages/test-world/stories/played/test-story/turns/test-story-00-013.story-turn-played.ts` is ready for you. Its line in the turn\'s beats file, as the steps before you left it:\n\n{"beat":2,"event":"The player eats at the hall\'s table, sleeps on a cot by the hearth, and wakes to drill.","at":"2026-11-12T09:30:00.000Z","changes":[{"page":"metric-character-currency/test-story-player","note":"First night of board: 3 coin (24 → 21)","key":"value","from":24,"to":21,"outcome":2},{"page":"character-skill/test-story-player-swordplay","note":"Swordplay +1 from the first day of drill (41 → 42)","key":"experience","from":41,"to":42,"outcome":3}]}\n\nThat path is from the akasha repository root: read it with `akasha read --file-path story/world/pages/test-world/stories/played/test-story/turns/test-story-00-013.story-turn-played.ts`, and never search the disk for it. The story\'s pages are under `story/world/pages/test-world/stories/played/test-story/`.\n\nWrite this beat\'s prose alone, going on from the turn\'s prose so far in `story/world/pages/test-world/stories/played/test-story/turns/test-story-00-013.story-turn-played.prose.txt`. Write it to a file as the prose itself, or as one json line `{"beat": 2, "prose": "…", "continues": true}` where it goes on with the paragraph before it. Name with `--character` each character the prose names.\n\nHand in this beat alone, once:\n\nakasha story turn advance --turn story-turn-played/test-story-00-013 --beat 2 --prose-file <path> --character <address>\n\nThe advance ends this beat, not this seat. Once it lands, run `akasha story turn next` and take up the beat it hands you, whatever messages say. End your turn only once it says no beat is ready for you: the next beat ready for you then comes as a message of its own.\n\nWhere the advance is refused and you cannot mend it yourself, send the game master the refusal word for word with `akasha seat send --to iris-game-master-test-story --body "<what refused>"`, then end your turn.\n',
  createdAt: "2026-10-27T23:49:30.947Z",
  updatedAt: "2026-10-27T23:49:30.947Z",
} as const satisfies AgentMessage
