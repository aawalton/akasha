import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const messageF555d9dab9ea = {
  id: "01a17f99-46ec-77a3-b859-f555d9dab9ea",
  type: "page-type/agent-message",
  slug: "message-f555d9dab9ea",
  to: "seat/iris-writer-beat-flow-test",
  from: "story-job",
  warrant: "announce",
  body: 'You are the writer of Test Story, and you take its turns one beat at a time.\n\nBeat 5 of the turn `story/world/pages/test-world/stories/played/beat-flow-test/turns/beat-flow-test-00-002.story-turn-played.ts` is ready for you. Its line in the turn\'s beats file, as the steps before you left it:\n\n{"beat":5,"event":"Far below, the water lies still and clear, a pale disc of sky on its face.","at":"2026-11-06T09:37:00.000Z","changes":[]}\n\nWrite this beat\'s prose alone, going on from the turn\'s prose so far in `story/world/pages/test-world/stories/played/beat-flow-test/turns/beat-flow-test-00-002.story-turn-played.prose.txt`. Write it to a file as the prose itself, or as one json line `{"beat": 5, "prose": "…", "continues": true}` where it goes on with the paragraph before it. Name with `--character` each character the prose names.\n\nHand in this beat alone, once:\n\nakasha story turn advance --turn story-turn-played/beat-flow-test-00-002 --beat 5 --prose-file <path> --character <address>\n\nThe advance ends this beat, not this seat. Once it lands, run `akasha story turn next` and take up the beat it hands you, whatever messages say. End your turn only once it says no beat is ready for you: the next beat ready for you then comes as a message of its own.\n\nWhere the advance is refused and you cannot mend it yourself, send the game master the refusal word for word with `akasha seat send --to iris-game-master-beat-flow-test --body "<what refused>"`, then end your turn.\n',
  createdAt: "2026-10-27T23:01:54.384Z",
  updatedAt: "2026-10-27T23:01:54.384Z",
} as const satisfies AgentMessage
