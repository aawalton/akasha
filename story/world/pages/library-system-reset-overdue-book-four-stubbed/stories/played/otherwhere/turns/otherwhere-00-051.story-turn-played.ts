import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhere00051 = {
  id: "01a0e5e3-2bf5-7e47-8c41-eaac5d6a7f30",
  type: "page-type/story-turn-played",
  slug: "otherwhere-00-051",
  ownLength: 79,
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere"],
  position: 51,
  prose: "txt",
  characters: ["character-player/otherwhere-alan", "character-other/otherwhere-links"],
  turnStatus: "turn-status/writer",
  action:
    "**Do it, just let me wash off the worst of the mess first **. I go to the tub and wash off the honey and salt, then fill the tub with water. **Ready**",
  beats: [
    "Nala tells Links to do it, but to let her wash off the worst of the mess first.",
    "In the bathroom she scrubs off the honey and salt under the cold tap, shivering.",
    "The honey comes off in sticky sheets; the salt stings every scrape and scar.",
    "She fills the deep stone tub with cold water and thinks at Links: ready.",
    "The water stirs; warmth spreads out from the bottom of the tub, and steam curls up off the surface.",
    "Steam fogs the little bathroom, and hot water laps at the stone rim by her cold, bare knees.",
  ],
  issues: ['"In moments the tub is steaming hot." - Leave It Open'],
  reviewedBy: ["story-reviewer/style", "story-reviewer/continuity"],
} as const satisfies StoryTurnPlayed
