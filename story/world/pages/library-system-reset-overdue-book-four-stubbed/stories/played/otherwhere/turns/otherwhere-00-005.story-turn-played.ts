import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhere00005 = {
  id: "01a0e390-05e7-74a4-99e0-7c638cbb9ae6",
  type: "page-type/story-turn-played",
  slug: "otherwhere-00-005",
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere"],
  position: 5,
  turnStatus: "turn-status/writer",
  action: '"Okay, I\'m in a magic library of some sort? Library, can you hear me?"',
  beats: [
    'Kneeling, she says, "Okay, I\'m in a magic library of some sort? Library, can you hear me?"',
    'The chamber throws it back at her: "Hear me... hear me... hear me..."',
    "High up on the trunk, two bright blue eyes open in the grey, far too big, and look down at her.",
    "Something pours down the trunk's face toward her like dark water, and lands on the floor before her.",
    "It is a lynx as tall as her thigh, bigger than any cat, glowing a deep purple that is near black.",
    "Its black stripes are script, runes that crawl and twist over its body as she watches.",
    "Its eyes are the same bright blue as the veins, much too large for its head, like a cartoon's.",
    "The eyes aren't kind; it looks her up and down as though she has already disappointed it.",
    'It speaks aloud, sharp and impatient: "Of course I can hear you. I am the Library. Links."',
    '"Like the cat. Spelled L-I-N-K-S," it adds, and its stripes twist.',
    "\"Not 'of some sort.' The Library. And this is the basement. Didn't you read the packet?\"",
    "It sits back on its haunches in front of her, ear tufts twitching, and waits for her answer.",
  ],
  lore: ["lore/otherwhere-alan", "place/otherwhere-core-chamber", "lore/otherwhere-links"],
} as const satisfies StoryTurnPlayed
