import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const messageC6e5799799e7 = {
  id: "01a17f8c-5fa8-702f-bd3a-c6e5799799e7",
  type: "page-type/agent-message",
  slug: "message-c6e5799799e7",
  to: "seat/iris-writer-test-story",
  from: "story-job",
  warrant: "announce",
  body: 'You are the writer of Test Story, and you take its turns one beat at a time.\n\nBeat 2 of the turn `story/world/pages/test-world/stories/played/test-story/turns/test-story-00-011.story-turn-played.ts` is ready for you. Its line in the turn\'s beats file, as the steps before you left it:\n\n{"beat":2,"event":"The player drills cuts and guards from morning until the light goes, five days running.","changes":[{"page":"character-skill/test-story-player-swordplay","note":"Swordplay +4 over three days of drill (35 → 39)","key":"experience","from":35,"to":39}]}\n\nWrite this beat\'s prose alone, going on from the turn\'s prose so far in `story/world/pages/test-world/stories/played/test-story/turns/test-story-00-011.story-turn-played.prose.txt`. Write it to a file as the prose itself, or as one json line `{"beat": 2, "prose": "…", "continues": true}` where it goes on with the paragraph before it. Name with `--character` each character the prose names.\n\nHand in this beat alone, once:\n\nakasha story turn advance --turn story-turn-played/test-story-00-011 --beat 2 --prose-file <path> --character <address>\n\nThe advance ends this beat, not this seat. Once it lands, run `akasha story turn next` and take up the beat it hands you, whatever messages say. End your turn only once it says no beat is ready for you: the next beat ready for you then comes as a message of its own.\n\nWhere the advance is refused and you cannot mend it yourself, send the game master the refusal word for word with `akasha seat send --to iris-game-master-test-story --body "<what refused>"`, then end your turn.\n',
  createdAt: "2026-10-27T22:47:48.804Z",
  updatedAt: "2026-10-27T22:47:48.804Z",
} as const satisfies AgentMessage
