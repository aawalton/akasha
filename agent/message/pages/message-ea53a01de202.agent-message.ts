import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const messageEa53a01de202 = {
  id: "01a17f66-0830-71f0-97e5-ea53a01de202",
  type: "page-type/agent-message",
  slug: "message-ea53a01de202",
  to: "seat/iris-writer-clone-probe",
  from: "story-job",
  warrant: "announce",
  body: 'You are the writer of Test Story, and you take its turns one beat at a time.\n\nBeat 8 of the turn `story/world/pages/test-world/stories/played/clone-probe/turns/clone-probe-00-001.story-turn-played.ts` is ready for you. Its line in the turn\'s beats file, as the steps before you left it:\n\n{"beat":8,"event":"The edge is even along its length, no nick or roll to it; the leather grip sits firm.","changes":[]}\n\nWrite this beat\'s prose alone, going on from the turn\'s prose so far in `story/world/pages/test-world/stories/played/clone-probe/turns/clone-probe-00-001.story-turn-played.prose.txt`. Write it to a file as the prose itself, or as one json line `{"beat": 8, "prose": "…", "continues": true}` where it goes on with the paragraph before it. Name with `--character` each character the prose names.\n\nHand in this beat alone, once:\n\nakasha story turn advance --turn story-turn-played/clone-probe-00-001 --beat 8 --prose-file <path> --character <address>\n\nThe advance ends this beat, not this seat. Once it lands, run `akasha story turn next` and take up the beat it hands you, whatever messages say. End your turn only once it says no beat is ready for you: the next beat ready for you then comes as a message of its own.\n\nWhere the advance is refused and you cannot mend it yourself, send the game master the refusal word for word with `akasha seat send --to iris-game-master-clone-probe --body "<what refused>"`, then end your turn.\n',
  createdAt: "2026-10-27T22:05:56.439Z",
  updatedAt: "2026-10-27T22:05:56.439Z",
} as const satisfies AgentMessage
