import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhere00062 = {
  id: "01a0e805-8097-713c-90e1-03a9844d12b1",
  type: "page-type/story-turn-played",
  slug: "otherwhere-00-062",
  ownLength: 73,
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere"],
  position: 62,
  prose: "txt",
  characters: ["character-player/otherwhere-alan", "character-other/otherwhere-links"],
  turnStatus: "turn-status/reviewers",
  action:
    "**What about dress and appearance, any specific expectations around librarians I need to comply with?**",
  beats: [
    "Nala asks Links whether a Librarian has to dress or look any particular way.",
    'Links: "The Library doesn\'t dress you. Wear what you like."',
    'Links: "But that blue robe of yours? Many peoples out there know it on sight. It says Librarian."',
    'Links: "Skin\'s trickier. Every people draws its own line on how much should show."',
    'Links: "Covered and neat offends almost nobody. Your robe\'s both. Mostly."',
  ],
  lore: ["lore/otherwhere-universe"],
} as const satisfies StoryTurnPlayed
