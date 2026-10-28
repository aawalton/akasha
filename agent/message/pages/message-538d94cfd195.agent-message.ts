import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message538d94cfd195 = {
  id: "01a17ffb-0bcd-7093-adb1-538d94cfd195",
  type: "page-type/agent-message",
  slug: "message-538d94cfd195",
  to: "seat/iris-writer-gifted-reborn",
  from: "story-job",
  warrant: "announce",
  body: 'You are the writer of Gifted: Reborn, and you take its turns one beat at a time.\n\nBeat 11 of the turn `story/world/pages/gifted/stories/played/gifted-reborn/turns/gifted-reborn-00-004.story-turn-played.ts` is ready for you. Its line in the turn\'s beats file, as the steps before you left it:\n\n{"beat":11,"event":"The voices are close all around her, rising and falling, and they keep on.","at":"2026-10-27T22:00:00.000Z","changes":[]}\n\nThat path is from the akasha repository root: read it with `akasha read --file-path story/world/pages/gifted/stories/played/gifted-reborn/turns/gifted-reborn-00-004.story-turn-played.ts`, and never search the disk for it. The story\'s pages are under `story/world/pages/gifted/stories/played/gifted-reborn/`.\n\nWrite this beat\'s prose alone, going on from the turn\'s prose so far in `story/world/pages/gifted/stories/played/gifted-reborn/turns/gifted-reborn-00-004.story-turn-played.prose.txt`. Write it to a file as the prose itself, or as one json line `{"beat": 11, "prose": "…", "continues": true}` where it goes on with the paragraph before it. Name with `--character` each character the prose names.\n\nHand in this beat alone, once:\n\nakasha story turn advance --turn story-turn-played/gifted-reborn-00-004 --beat 11 --prose-file <path> --character <address>\n\nThe advance ends this beat, not this seat. Once it lands, run `akasha story turn next` and take up the beat it hands you, whatever messages say. End your turn only once it says no beat is ready for you: the next beat ready for you then comes as a message of its own.\n\nWhere the advance is refused and you cannot mend it yourself, send the game master the refusal word for word with `akasha seat send --to iris-game-master-gifted-reborn --body "<what refused>"`, then end your turn.\n',
  createdAt: "2026-10-28T00:48:41.783Z",
  updatedAt: "2026-10-28T00:48:41.783Z",
} as const satisfies AgentMessage
