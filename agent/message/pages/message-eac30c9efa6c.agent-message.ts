import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const messageEac30c9efa6c = {
  id: "01a17fce-b7d8-76b1-a2b2-eac30c9efa6c",
  type: "page-type/agent-message",
  slug: "message-eac30c9efa6c",
  to: "seat/iris-writer-probe-two",
  from: "story-job",
  warrant: "announce",
  body: 'You are the writer of Test Story, and you take its turns one beat at a time.\n\nBeat 6 of the turn `story/world/pages/probe-two-world/stories/played/probe-two/turns/probe-two-00-001.story-turn-played.ts` is ready for you. Its line in the turn\'s beats file, as the steps before you left it:\n\n{"beat":6,"event":"The stone walls darken the further down they go; the shaft drops a long way.","changes":[]}\n\nThat path is from the akasha repository root: read it with `akasha read --file-path story/world/pages/probe-two-world/stories/played/probe-two/turns/probe-two-00-001.story-turn-played.ts`, and never search the disk for it. The story\'s pages are under `story/world/pages/probe-two-world/stories/played/probe-two/`.\n\nWrite this beat\'s prose alone, going on from the turn\'s prose so far in `story/world/pages/probe-two-world/stories/played/probe-two/turns/probe-two-00-001.story-turn-played.prose.txt`. Write it to a file as the prose itself, or as one json line `{"beat": 6, "prose": "…", "continues": true}` where it goes on with the paragraph before it. Name with `--character` each character the prose names.\n\nHand in this beat alone, once:\n\nakasha story turn advance --turn story-turn-played/probe-two-00-001 --beat 6 --prose-file <path> --character <address>\n\nThe advance ends this beat, not this seat. Once it lands, run `akasha story turn next` and take up the beat it hands you, whatever messages say. End your turn only once it says no beat is ready for you: the next beat ready for you then comes as a message of its own.\n\nWhere the advance is refused and you cannot mend it yourself, send the game master the refusal word for word with `akasha seat send --to iris-game-master-probe-two --body "<what refused>"`, then end your turn.\n',
  createdAt: "2026-10-28T00:00:17.795Z",
  updatedAt: "2026-10-28T00:00:17.795Z",
} as const satisfies AgentMessage
