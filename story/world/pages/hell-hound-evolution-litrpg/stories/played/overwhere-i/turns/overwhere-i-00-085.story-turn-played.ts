import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereI00085 = {
  id: "01a0fe47-42d8-70da-89d9-597cf2336fbf",
  type: "page-type/story-turn-played",
  slug: "overwhere-i-00-085",
  ownLength: 171,
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-i"],
  position: 85,
  prose: "txt",
  characters: ["character-player/overwhere-i-nala", "character-other/overwhere-i-harl-voss"],
  stepStatus: "step-status/recorders",
  action:
    "I walk slowly towards him. “Your time has come, Voss. And you want to know why? Is simple. You are worth quite a lot to me dead and nothing to me alive.” When I get in range, I do my double fire beam and burn through his shield, through his armor, and through his body.",
  beats: [
    "Nala steps out of the pines and walks slowly up the stream bank toward the overhang.",
    '"Your time has come, Voss. And you want to know why? Is simple."',
    '"You are worth quite a lot to me dead and nothing to me alive."',
    'Voss rises behind his shield. "I come dearer than that, woman," he calls down.',
    "He waits, sword low, until she is thirty yards off, then charges down the slope, shield high.",
    "She lifts both hands and crosses two fire beams on the face of his shield.",
    "They burn through the wood and the mail beneath; he roars, smoking, and keeps coming.",
    "Her second pair meets on the charred shield; it bursts through, and through him.",
    "Ten yards short of her, Voss pitches forward onto the stones and lies still.",
    "His burned shield rolls a little way down the bank and falls flat.",
    "Under the overhang his sack slumps over, and silver coins spill chinking across the rock.",
  ],
  issues: [
    '"Under the overhang the sack sits where he left it, the dusk thickening" - Leave It Open',
  ],
  lore: [
    "lore/overwhere-i-nala",
    "lore/overwhere-i-nala-2",
    "lore/overwhere-i-starfall-legacy",
    "lore/overwhere-i-starfall-legacy-2",
    "lore/overwhere-i-the-deserter-crew-2",
    "lore/overwhere-i-the-deserter-crew-2-2",
    "lore/overwhere-i-the-system-2",
  ],
  reviewedBy: ["story-reviewer/continuity", "story-reviewer/style"],
  endsAt: "2026-10-03T19:03:00.000Z",
} as const satisfies StoryTurnPlayed
