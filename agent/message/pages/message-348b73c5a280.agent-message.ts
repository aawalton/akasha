import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message348b73c5a280 = {
  id: "01a17f8d-c7c5-75fa-9641-348b73c5a280",
  type: "page-type/agent-message",
  slug: "message-348b73c5a280",
  to: "seat/iris-writer-beat-flow-test",
  from: "story-job",
  warrant: "announce",
  body: 'You are the writer of Test Story, and you take its turns one beat at a time.\n\nBeat 3 of the turn `story/world/pages/test-world/stories/played/beat-flow-test/turns/beat-flow-test-00-001.story-turn-played.ts` is ready for you. Its line in the turn\'s beats file, as the steps before you left it:\n\n{"beat":3,"event":"He drinks the red draught down in two swallows, sweet and faintly metallic.","changes":[{"page":"story-item/beat-flow-test-player-healing-draught","note":"Healing draught used: 2 → 1","key":"quantity","from":2,"to":1}]}\n\nWrite this beat\'s prose alone, going on from the turn\'s prose so far in `story/world/pages/test-world/stories/played/beat-flow-test/turns/beat-flow-test-00-001.story-turn-played.prose.txt`. Write it to a file as the prose itself, or as one json line `{"beat": 3, "prose": "…", "continues": true}` where it goes on with the paragraph before it. Name with `--character` each character the prose names.\n\nHand in this beat alone, once:\n\nakasha story turn advance --turn story-turn-played/beat-flow-test-00-001 --beat 3 --prose-file <path> --character <address>\n\nThe advance ends this beat, not this seat. Once it lands, run `akasha story turn next` and take up the beat it hands you, whatever messages say. End your turn only once it says no beat is ready for you: the next beat ready for you then comes as a message of its own.\n\nWhere the advance is refused and you cannot mend it yourself, send the game master the refusal word for word with `akasha seat send --to iris-game-master-beat-flow-test --body "<what refused>"`, then end your turn.\n',
  createdAt: "2026-10-27T22:49:20.978Z",
  updatedAt: "2026-10-27T22:49:20.978Z",
} as const satisfies AgentMessage
