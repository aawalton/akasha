import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message02daf21d2d61 = {
  id: "01a17f65-71a6-7462-ae64-02daf21d2d61",
  type: "page-type/agent-message",
  slug: "message-02daf21d2d61",
  to: "seat/iris-writer-clone-probe",
  from: "story-job",
  warrant: "announce",
  body: 'You are the writer of Test Story, and you take its turns one beat at a time.\n\nBeat 7 of the turn `story/world/pages/test-world/stories/played/clone-probe/turns/clone-probe-00-001.story-turn-played.ts` is ready for you. Its line in the turn\'s beats file, as the steps before you left it:\n\n{"beat":7,"event":"He draws the iron sword and runs a thumb along its edge.","at":"2026-11-06T08:48:00.000Z","changes":[{"page":"story-item/clone-probe-player-iron-sword","note":"Iron sword drawn: main hand","key":"slot","from":null,"to":"item-slot/main-hand"}]}\n\nWrite this beat\'s prose alone, going on from the turn\'s prose so far in `story/world/pages/test-world/stories/played/clone-probe/turns/clone-probe-00-001.story-turn-played.prose.txt`. Write it to a file as the prose itself, or as one json line `{"beat": 7, "prose": "…", "continues": true}` where it goes on with the paragraph before it. Name with `--character` each character the prose names.\n\nHand in this beat alone, once:\n\nakasha story turn advance --turn story-turn-played/clone-probe-00-001 --beat 7 --prose-file <path> --character <address>\n\nThe advance ends this beat, not this seat. Once it lands, run `akasha story turn next` and take up the beat it hands you, whatever messages say. End your turn only once it says no beat is ready for you: the next beat ready for you then comes as a message of its own.\n\nWhere the advance is refused and you cannot mend it yourself, send the game master the refusal word for word with `akasha seat send --to iris-game-master-clone-probe --body "<what refused>"`, then end your turn.\n',
  createdAt: "2026-10-27T22:05:17.512Z",
  updatedAt: "2026-10-27T22:05:17.512Z",
} as const satisfies AgentMessage
