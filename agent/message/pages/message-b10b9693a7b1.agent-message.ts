import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const messageB10b9693a7b1 = {
  id: "01a17f46-a48c-753c-bc52-b10b9693a7b1",
  type: "page-type/agent-message",
  slug: "message-b10b9693a7b1",
  to: "seat/iris-writer-test-story",
  from: "story-job",
  warrant: "announce",
  body: 'You are the writer of Test Story, and you take its turns one beat at a time.\n\nBeat 2 of the turn `story/world/pages/test-world/stories/played/test-story/turns/test-story-00-009.story-turn-played.ts` is ready for you. Its line in the turn\'s beats file, as the steps before you left it:\n\n{"beat":2,"event":"The player climbs the steps from the square into the hall.","at":"2026-10-27T08:48:00.000Z","place":"place/test-world-hall","changes":[]}\n\nWrite this beat\'s prose alone, going on from the turn\'s prose so far in `story/world/pages/test-world/stories/played/test-story/turns/test-story-00-009.story-turn-played.prose.txt`. Write it to a file as the prose itself, or as one json line `{"beat": 2, "prose": "…", "continues": true}` where it goes on with the paragraph before it. Name with `--character` each character the prose names.\n\nHand in this beat alone, once:\n\nakasha story turn advance --turn story-turn-played/test-story-00-009 --beat 2 --prose-file <path> --character <address>\n\nThe advance ends this beat, not this seat. Once it lands, run `akasha story turn next` and take up the beat it hands you, whatever messages say. End your turn only once it says no beat is ready for you: the next beat ready for you then comes as a message of its own.\n\nWhere the advance is refused and you cannot mend it yourself, send the game master the refusal word for word with `akasha seat send --to iris-game-master-test-story --body "<what refused>"`, then end your turn.\n',
  createdAt: "2026-10-27T21:31:38.956Z",
  updatedAt: "2026-10-27T21:31:38.956Z",
} as const satisfies AgentMessage
