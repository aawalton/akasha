import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereIii00094 = {
  id: "01a101c6-f616-71dd-9fb4-17410eecc59c",
  type: "page-type/story-turn-played",
  slug: "overwhere-iii-00-094",
  ownLength: 141,
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-iii"],
  position: 94,
  prose: "txt",
  characters: ["character-player/overwhere-iii-nala"],
  stepStatus: "step-status/recorders",
  action:
    "I rest and recover my mana, while practicing with the currents, trying to come up with new spells",
  beats: [
    "Nala settles with her back to a shrine stone and lets her well refill.",
    "She plays with the white-gold current, drawing it through her fingers into loose new shapes.",
    "A spiral collapses; a strand sent wide frays. Each fed try leaves a small burn.",
    "One shape keeps coming back: the current drawn close, lying over her own skin.",
    "She tries to close it over her forearm. It slips, and stings her.",
    "She tries again slower, feeding it from the current, and it settles over her like warm light.",
    "A faint white-gold shimmer lies over her skin, and holds.",
    "[New skill acquired – Holy Ward.]",
    "Her well is full again. The shadows of the shrine stones are long; the sun is low over the wood.",
    "[Holy Ward – At [Basic] level, weave white-gold close over yourself to turn blows and blight.]",
  ],
  lore: [
    "lore/overwhere-iii-holy-ward",
    "lore/overwhere-iii-nala",
    "lore/overwhere-iii-nala-2",
    "lore/overwhere-iii-nala-2-2",
  ],
  reviewedBy: ["story-reviewer/style", "story-reviewer/continuity"],
  recordedBy: ["story-recorder/inventory", "story-recorder/memory", "story-recorder/mechanics"],
  endsAt: "2026-10-09T17:15:00.000Z",
} as const satisfies StoryTurnPlayed
