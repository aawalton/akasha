import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhere00017 = {
  id: "01a0e4a2-ba45-7a22-9f77-0741d748b5be",
  type: "page-type/story-turn-played",
  slug: "otherwhere-00-017",
  cover: "image/image-847fb824516a0145",
  ownLength: 151,
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere"],
  position: 17,
  prose: "txt",
  characters: ["character-player/otherwhere-alan", "character-other/otherwhere-links"],
  turnStatus: "turn-status/player",
  action:
    "“Okay, that was harder than expected. Is there an easy way here that I’m missing, or were you really expecting me to take on a room of these with a broom?”",
  beats: [
    'Still sitting back on her heels, she says, "Okay, that was harder than expected."',
    '"Is there an easy way here that I\'m missing?"',
    '"Or were you really expecting me to take on a room of these with a broom?"',
    'Links\'s ears go back. "The broom was never for hitting them," he says, stung.',
    '"You sweep with it. Push the salt onto them with the bristles, from past where they can lunge."',
    '"And they won\'t cross salt. An unbroken line of it, and a bookworm stays on its own side."',
    '"Ring one in, and it\'s penned. Then you can take your time."',
    "He looks at the scrape on her forearm and the torn tights at her calf, and his runes slow.",
    '"I could claw them myself," he says, more quietly. "Every swipe costs power I haven\'t got."',
  ],
  lore: ["place/otherwhere-main-hall"],
  reviewedBy: ["story-reviewer/style", "story-reviewer/continuity"],
  recordedBy: ["story-recorder/mechanics", "story-recorder/memory", "story-recorder/picture"],
} as const satisfies StoryTurnPlayed
