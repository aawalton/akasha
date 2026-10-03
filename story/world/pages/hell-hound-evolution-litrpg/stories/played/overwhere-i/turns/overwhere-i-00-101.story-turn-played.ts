import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereI00101 = {
  id: "01a0ff3b-55f4-72bb-b806-2eeaf4fa6f3c",
  type: "page-type/story-turn-played",
  slug: "overwhere-i-00-101",
  ownLength: 228,
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-i"],
  position: 101,
  prose: "txt",
  characters: [
    "character-player/overwhere-i-nala",
    "character-other/overwhere-i-harl-voss",
    "character-other/overwhere-i-ghost-eye",
  ],
  stepStatus: "step-status/writer",
  action: "“Yeah, put me down. I definitely see more killing things for money in my future.”",
  beats: [
    '"Yeah, put me down. I definitely see more killing things for money in my future," Nala says.',
    'Grete opens the roll ledger and writes "Nala Arthur" beside the date and "Level 10."',
    'From a drawer she sets a bronze antler badge on the counter. "That marks a rolled hunter."',
    '"Two contracts stand open, now Voss and Ghost-Eye are down." She lays two slips flat.',
    '"The margrave\'s reeve pays 8 gold for a true account of why the Greyfen crystals went dark."',
    '"And 15 gold for the Weir Wyrm, a river serpent taking bargemen at Hobb\'s Mill weir."',
    "\"Two hours' walk down the Wend. Level 18, by the bargemen's tales; that's all anyone has of it.\"",
    'Grete taps the slips with a scarred finger. "First call\'s yours, Nala Arthur. Which one?"',
  ],
  issues: ['"from Antler Hall" - What It Is'],
  lore: [
    "lore/overwhere-i-nala",
    "lore/overwhere-i-nala-2",
    "lore/overwhere-i-the-system-2",
    "place/overwhere-i-wendlow",
  ],
  reviewedBy: ["story-reviewer/continuity", "story-reviewer/style"],
  endsAt: "2026-10-05T12:35:00.000Z",
} as const satisfies StoryTurnPlayed
