import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const messageEf05ced5bf58 = {
  id: "01a17fd0-091f-743d-b472-ef05ced5bf58",
  type: "page-type/agent-message",
  slug: "message-ef05ced5bf58",
  to: "seat/iris-writer-probe-two",
  from: "story-job",
  warrant: "announce",
  body: 'You are the writer of Test Story, and you take its turns one beat at a time.\n\nBeat 8 of the turn `story/world/pages/probe-two-world/stories/played/probe-two/turns/probe-two-00-001.story-turn-played.ts` is ready for you. Its line in the turn\'s beats file, as the steps before you left it:\n\n{"beat":8,"event":"Beside the well, a stone stair leads down out of the square.","changes":[]}\n\nThat path is from the akasha repository root: read it with `akasha read --file-path story/world/pages/probe-two-world/stories/played/probe-two/turns/probe-two-00-001.story-turn-played.ts`, and never search the disk for it. The story\'s pages are under `story/world/pages/probe-two-world/stories/played/probe-two/`.\n\nWrite this beat\'s prose alone, going on from the turn\'s prose so far in `story/world/pages/probe-two-world/stories/played/probe-two/turns/probe-two-00-001.story-turn-played.prose.txt`. Write it to a file as the prose itself, or as one json line `{"beat": 8, "prose": "…", "continues": true}` where it goes on with the paragraph before it. Name with `--character` each character the prose names.\n\nHand in this beat alone, once:\n\nakasha story turn advance --turn story-turn-played/probe-two-00-001 --beat 8 --prose-file <path> --character <address>\n\nThe advance ends this beat, not this seat. Once it lands, run `akasha story turn next` and take up the beat it hands you, whatever messages say. End your turn only once it says no beat is ready for you: the next beat ready for you then comes as a message of its own.\n\nWhere the advance is refused and you cannot mend it yourself, send the game master the refusal word for word with `akasha seat send --to iris-game-master-probe-two --body "<what refused>"`, then end your turn.\n',
  createdAt: "2026-10-28T00:01:43.126Z",
  updatedAt: "2026-10-28T00:01:43.126Z",
} as const satisfies AgentMessage
