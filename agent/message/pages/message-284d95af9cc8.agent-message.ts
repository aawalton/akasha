import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message284d95af9cc8 = {
  id: "01a1802d-bbae-7725-b0e1-284d95af9cc8",
  type: "page-type/agent-message",
  slug: "message-284d95af9cc8",
  to: "seat/iris-writer-test-story",
  from: "story-job",
  warrant: "announce",
  body: 'You are the writer of Test Story, and you take its turns one beat at a time.\n\nBeat 1 of the turn `story/world/pages/test-world/stories/played/test-story/turns/test-story-00-015.story-turn-played.ts` is ready for you. Its line in the turn\'s beats file, as the steps before you left it:\n\n{"beat":1,"event":"The player turns to nod to the shopkeeper, but she is across the square in her shop.","at":"2026-11-13T12:03:00.000Z","changes":[]}\n\nThat path is from the akasha repository root: read it with `akasha read --file-path story/world/pages/test-world/stories/played/test-story/turns/test-story-00-015.story-turn-played.ts`, and never search the disk for it. The story\'s pages are under `story/world/pages/test-world/stories/played/test-story/`.\n\nWrite this beat\'s prose alone, going on from the turn\'s prose so far in `story/world/pages/test-world/stories/played/test-story/turns/test-story-00-015.story-turn-played.prose.txt`. Write it to a file as the prose itself, or as one json line `{"beat": 1, "prose": "…", "continues": true}` where it goes on with the paragraph before it. Name with `--character` each character the prose names.\n\nHand in this beat alone, once:\n\nakasha story turn advance --turn story-turn-played/test-story-00-015 --beat 1 --prose-file <path> --character <address>\n\nThe advance ends this beat, not this seat. Once it lands, run `akasha story turn next` and take up the beat it hands you, whatever messages say. End your turn only once it says no beat is ready for you: the next beat ready for you then comes as a message of its own.\n\nWhere the advance is refused and you cannot mend it yourself, send the game master the refusal word for word with `akasha seat send --to iris-game-master-test-story --body "<what refused>"`, then end your turn.\n',
  createdAt: "2026-10-28T01:44:03.578Z",
  updatedAt: "2026-10-28T01:44:03.578Z",
} as const satisfies AgentMessage
