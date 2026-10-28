import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message686ef649d5d8 = {
  id: "01a17fed-a152-7487-88cb-686ef649d5d8",
  type: "page-type/agent-message",
  slug: "message-686ef649d5d8",
  to: "seat/iris-writer-beat-flow-test",
  from: "story-job",
  warrant: "announce",
  body: 'You are the writer of Test Story, and you take its turns one beat at a time.\n\nBeat 3 of the turn `story/world/pages/test-world/stories/played/beat-flow-test/turns/beat-flow-test-00-003.story-turn-played.ts` is ready for you. Its line in the turn\'s beats file, as the steps before you left it:\n\n{"beat":3,"event":"He stretches his legs out over the cobbles and leans back.","changes":[]}\n\nThat path is from the akasha repository root: read it with `akasha read --file-path story/world/pages/test-world/stories/played/beat-flow-test/turns/beat-flow-test-00-003.story-turn-played.ts`, and never search the disk for it. The story\'s pages are under `story/world/pages/test-world/stories/played/beat-flow-test/`.\n\nWrite this beat\'s prose alone, going on from the turn\'s prose so far in `story/world/pages/test-world/stories/played/beat-flow-test/turns/beat-flow-test-00-003.story-turn-played.prose.txt`. Write it to a file as the prose itself, or as one json line `{"beat": 3, "prose": "…", "continues": true}` where it goes on with the paragraph before it. Name with `--character` each character the prose names.\n\nHand in this beat alone, once:\n\nakasha story turn advance --turn story-turn-played/beat-flow-test-00-003 --beat 3 --prose-file <path> --character <address>\n\nThe advance ends this beat, not this seat. Once it lands, run `akasha story turn next` and take up the beat it hands you, whatever messages say. End your turn only once it says no beat is ready for you: the next beat ready for you then comes as a message of its own.\n\nWhere the advance is refused and you cannot mend it yourself, send the game master the refusal word for word with `akasha seat send --to iris-game-master-beat-flow-test --body "<what refused>"`, then end your turn.\n',
  createdAt: "2026-10-28T00:34:02.571Z",
  updatedAt: "2026-10-28T00:34:02.571Z",
} as const satisfies AgentMessage
