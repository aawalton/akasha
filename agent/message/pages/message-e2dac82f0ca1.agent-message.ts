import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const messageE2dac82f0ca1 = {
  id: "01a18024-f50b-7610-838f-e2dac82f0ca1",
  type: "page-type/agent-message",
  slug: "message-e2dac82f0ca1",
  to: "seat/iris-writer-outcome-cards-check",
  from: "story-job",
  warrant: "announce",
  body: 'You are the writer of Test Story, and you take its turns one beat at a time.\n\nBeat 3 of the turn `story/world/pages/outcome-cards-check-world/stories/played/outcome-cards-check/turns/outcome-cards-check-00-001.story-turn-played.ts` is ready for you. Its line in the turn\'s beats file, as the steps before you left it:\n\n{"beat":3,"event":"A dry leaf breaks from a branch and drifts down, turning as it falls.","changes":[]}\n\nThat path is from the akasha repository root: read it with `akasha read --file-path story/world/pages/outcome-cards-check-world/stories/played/outcome-cards-check/turns/outcome-cards-check-00-001.story-turn-played.ts`, and never search the disk for it. The story\'s pages are under `story/world/pages/outcome-cards-check-world/stories/played/outcome-cards-check/`.\n\nWrite this beat\'s prose alone, going on from the turn\'s prose so far in `story/world/pages/outcome-cards-check-world/stories/played/outcome-cards-check/turns/outcome-cards-check-00-001.story-turn-played.prose.txt`. Write it to a file as the prose itself, or as one json line `{"beat": 3, "prose": "…", "continues": true}` where it goes on with the paragraph before it. Name with `--character` each character the prose names.\n\nHand in this beat alone, once:\n\nakasha story turn advance --turn story-turn-played/outcome-cards-check-00-001 --beat 3 --prose-file <path> --character <address>\n\nThe advance ends this beat, not this seat. Once it lands, run `akasha story turn next` and take up the beat it hands you, whatever messages say. End your turn only once it says no beat is ready for you: the next beat ready for you then comes as a message of its own.\n\nWhere the advance is refused and you cannot mend it yourself, send the game master the refusal word for word with `akasha seat send --to iris-game-master-outcome-cards-check --body "<what refused>"`, then end your turn.\n',
  createdAt: "2026-10-28T01:34:28.464Z",
  updatedAt: "2026-10-28T01:34:28.464Z",
} as const satisfies AgentMessage
