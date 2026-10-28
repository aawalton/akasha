import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const messageC3a7b36dd611 = {
  id: "01a18026-aa09-714a-a47c-c3a7b36dd611",
  type: "page-type/agent-message",
  slug: "message-c3a7b36dd611",
  to: "seat/iris-writer-outcome-cards-check",
  from: "story-job",
  warrant: "announce",
  body: 'You are the writer of Test Story, and you take its turns one beat at a time.\n\nBeat 6 of the turn `story/world/pages/outcome-cards-check-world/stories/played/outcome-cards-check/turns/outcome-cards-check-00-001.story-turn-played.ts` is ready for you. Its line in the turn\'s beats file, as the steps before you left it:\n\n{"beat":6,"event":"The halves settle on the cobbles. The square is quiet, the green door and steps unwatched.","at":"2026-10-27T08:02:00.000Z","changes":[]}\n\nThat path is from the akasha repository root: read it with `akasha read --file-path story/world/pages/outcome-cards-check-world/stories/played/outcome-cards-check/turns/outcome-cards-check-00-001.story-turn-played.ts`, and never search the disk for it. The story\'s pages are under `story/world/pages/outcome-cards-check-world/stories/played/outcome-cards-check/`.\n\nWrite this beat\'s prose alone, going on from the turn\'s prose so far in `story/world/pages/outcome-cards-check-world/stories/played/outcome-cards-check/turns/outcome-cards-check-00-001.story-turn-played.prose.txt`. Write it to a file as the prose itself, or as one json line `{"beat": 6, "prose": "…", "continues": true}` where it goes on with the paragraph before it. Name with `--character` each character the prose names.\n\nHand in this beat alone, once:\n\nakasha story turn advance --turn story-turn-played/outcome-cards-check-00-001 --beat 6 --prose-file <path> --character <address>\n\nThe advance ends this beat, not this seat. Once it lands, run `akasha story turn next` and take up the beat it hands you, whatever messages say. End your turn only once it says no beat is ready for you: the next beat ready for you then comes as a message of its own.\n\nWhere the advance is refused and you cannot mend it yourself, send the game master the refusal word for word with `akasha seat send --to iris-game-master-outcome-cards-check --body "<what refused>"`, then end your turn.\n',
  createdAt: "2026-10-28T01:36:20.343Z",
  updatedAt: "2026-10-28T01:36:20.343Z",
} as const satisfies AgentMessage
