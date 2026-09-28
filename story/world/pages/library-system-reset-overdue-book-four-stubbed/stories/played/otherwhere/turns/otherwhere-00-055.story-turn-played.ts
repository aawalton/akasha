import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhere00055 = {
  id: "01a0e7c8-3ddc-7c98-909a-b38afe1105fd",
  type: "page-type/story-turn-played",
  slug: "otherwhere-00-055",
  ownLength: 117,
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere"],
  position: 55,
  prose: "txt",
  characters: ["character-player/otherwhere-alan", "character-other/otherwhere-links"],
  turnStatus: "turn-status/reviewers",
  action:
    "**Three thousand is a lot. Is there any magic available to make this faster? Telekineses? Divination? …Bookmancy? Even a library assistant?**",
  beats: [
    "Nala aims a thought at Links: three thousand is a lot; is there magic to make it faster?",
    "She runs through the options: telekinesis, divination, bookmancy, even a library assistant?",
    'Links: "Assistants? None. Not for centuries. You are the whole staff."',
    'Links: "But linked to me, you can learn my own magic from my books, whatever your affinity."',
    'Links: "There is a book that teaches sending a book home to its shelf. It is in here somewhere."',
    "His eyes flicker blue, then dim: \"Lost in the heaps. I know it's here; I can't tell you where.\"",
    'Links: "At fifty power my golems wake, and there are shelving golems among them."',
  ],
  lore: ["lore/otherwhere-universe", "place/otherwhere-main-hall"],
} as const satisfies StoryTurnPlayed
