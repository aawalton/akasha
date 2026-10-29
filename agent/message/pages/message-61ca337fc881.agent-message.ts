import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message61ca337fc881 = {
  id: "01a18948-6fd0-7111-b7ce-61ca337fc881",
  type: "page-type/agent-message",
  slug: "message-61ca337fc881",
  to: "seat/iris-writer-gifted-reborn",
  from: "story-job",
  warrant: "announce",
  body: 'You are the writer of Gifted: Reborn, and you take its turns one beat at a time.\n\nBeat 8 of the turn `story/world/pages/gifted/stories/played/gifted-reborn/turns/gifted-reborn-00-005.story-turn-played.ts` is ready for you. Its line in the turn\'s beats file, as the steps before you left it:\n\n{"beat":8,"event":"The moduli come easier now; the loops fall into their places in her memory.","changes":[{"page":"character-skill/gifted-reborn-nala-path-of-basic-numeracy","note":"Basic Numeracy practice: +8 steps (85 → 93)","key":"experience","from":85,"to":93,"outcome":14}]}\n\nThat path is from the akasha repository root: read it with `akasha read --file-path story/world/pages/gifted/stories/played/gifted-reborn/turns/gifted-reborn-00-005.story-turn-played.ts`, and never search the disk for it. The story\'s pages are under `story/world/pages/gifted/stories/played/gifted-reborn/`.\n\nWrite this beat\'s prose alone, going on from the turn\'s prose so far in `story/world/pages/gifted/stories/played/gifted-reborn/turns/gifted-reborn-00-005.story-turn-played.prose.txt`. Write it to a file as the prose itself, or as one json line `{"beat": 8, "prose": "…", "continues": true}` where it goes on with the paragraph before it. Name with `--character` each character the prose names.\n\nHand in this beat alone, once:\n\nakasha story turn advance --turn story-turn-played/gifted-reborn-00-005 --beat 8 --prose-file <path> --character <address>\n\nThe advance ends this beat, not this seat. Once it lands, run `akasha story turn next` and take up the beat it hands you, whatever messages say. End your turn only once it says no beat is ready for you: the next beat ready for you then comes as a message of its own.\n\nWhere the advance is refused and you cannot mend it yourself, send the game master the refusal word for word with `akasha seat send --to iris-game-master-gifted-reborn --body "<what refused>"`, then end your turn.\n',
  createdAt: "2026-10-29T20:09:48.612Z",
  updatedAt: "2026-10-29T20:09:48.612Z",
} as const satisfies AgentMessage
