import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const messageAc6b711f6362 = {
  id: "01a17fca-0590-72fc-954f-ac6b711f6362",
  type: "page-type/agent-message",
  slug: "message-ac6b711f6362",
  to: "seat/iris-writer-gifted-reborn",
  from: "story-job",
  warrant: "announce",
  body: 'You are the writer of Gifted: Reborn, and you take its turns one beat at a time.\n\nBeat 8 of the turn `story/world/pages/gifted/stories/played/gifted-reborn/turns/gifted-reborn-00-002.story-turn-played.ts` is ready for you. Its line in the turn\'s beats file, as the steps before you left it:\n\n{"beat":8,"event":"She spreads into the half of the body it held; the whole small body is hers now.","changes":[]}\n\nThat path is from the akasha repository root: read it with `akasha read --file-path story/world/pages/gifted/stories/played/gifted-reborn/turns/gifted-reborn-00-002.story-turn-played.ts`, and never search the disk for it. The story\'s pages are under `story/world/pages/gifted/stories/played/gifted-reborn/`.\n\nWrite this beat\'s prose alone, going on from the turn\'s prose so far in `story/world/pages/gifted/stories/played/gifted-reborn/turns/gifted-reborn-00-002.story-turn-played.prose.txt`. Write it to a file as the prose itself, or as one json line `{"beat": 8, "prose": "…", "continues": true}` where it goes on with the paragraph before it. Name with `--character` each character the prose names.\n\nHand in this beat alone, once:\n\nakasha story turn advance --turn story-turn-played/gifted-reborn-00-002 --beat 8 --prose-file <path> --character <address>\n\nThe advance ends this beat, not this seat. Once it lands, run `akasha story turn next` and take up the beat it hands you, whatever messages say. End your turn only once it says no beat is ready for you: the next beat ready for you then comes as a message of its own.\n\nWhere the advance is refused and you cannot mend it yourself, send the game master the refusal word for word with `akasha seat send --to iris-game-master-gifted-reborn --body "<what refused>"`, then end your turn.\n',
  createdAt: "2026-10-27T23:55:09.057Z",
  updatedAt: "2026-10-27T23:55:09.057Z",
} as const satisfies AgentMessage
