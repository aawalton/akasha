import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereIv00041 = {
  id: "01a0f45e-d715-7b49-b4a2-52138bd79241",
  type: "page-type/story-turn-played",
  slug: "overwhere-iv-00-041",
  ownLength: 134,
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-iv"],
  position: 41,
  prose: "txt",
  characters: ["character-player/overwhere-iv-nala"],
  stepStatus: "step-status/recorders",
  action:
    "“I’ve been working hard on a spear skill. It’s specialized for armor piercing, but turns out that works great on hardwood. What is hardwood but the armor of a tree?” I sat with a smirk. Anything else you need from me? Need the branches trimmed or the trunk chopped up",
  beats: [
    '"I\'ve been working hard on a spear skill," Nala says. "It\'s made for piercing armor."',
    '"Turns out it works great on hardwood. What is hardwood but the armor of a tree?" She smirks.',
    'The herdsman cocks his head, ear toward her. "Spear skill," he repeats, and grunts. Adventurers.',
    '"Anything else you need from me?" she asks. "Branches trimmed? The trunk cut up?"',
    "He brightens, and stumps along the fallen trunk, slapping the bark as he goes.",
    "\"Twenty foot from the butt, that's the shaft. Cut it there. Top's firewood for the reeve's men.\"",
    'He stops at the first of four thick limbs, each a foot through. "And these off, clean, all four."',
    "\"There's my axe on the sledge, if your spear wants a rest. My back's past oak limbs, girl.\"",
  ],
  lore: ["lore/overwhere-iv-nala", "lore/overwhere-iv-nala-2", "place/overwhere-iv-reeves-pasture"],
  reviewedBy: ["story-reviewer/style", "story-reviewer/continuity"],
  recordedBy: ["story-recorder/inventory"],
  endsAt: "2026-10-02T09:37:00.000Z",
} as const satisfies StoryTurnPlayed
