import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereI00027 = {
  id: "01a0f33a-296d-7304-b9aa-4bc2054ad16f",
  type: "page-type/story-turn-played",
  slug: "overwhere-i-00-027",
  ownLength: 131,
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-i"],
  position: 27,
  prose: "txt",
  characters: ["character-player/overwhere-i-nala"],
  stepStatus: "step-status/recorders",
  action: "“Yeah, what do they look like? How can I find them?”",
  beats: [
    "Nala says yes, and asks what they look like and how she can find them.",
    'Jory holds out his arms as wide as they go. "Long as a man. Brown and sleek, like a big otter."',
    '"But the jaws are a croc\'s. Webbed claws. Little yellow eyes, low in the water."',
    '"Days, they lie up in holts dug into the channel banks. The mouths are under water."',
    '"You\'ll not see a hole unless you know to look for one."',
    "\"After full dark they come to my traps, for the eels caught in them. That's when you'll see them.\"",
    'He wipes his hands on his apron. "I\'ll walk you out there by day and show you the channels."',
    '"But I\'ll not stay out there after dark. Not for three silver a head, nor thirty."',
  ],
  lore: ["lore/overwhere-i-greyfen-beasts", "lore/overwhere-i-nala", "place/overwhere-i-fenwatch"],
  reviewedBy: ["story-reviewer/continuity", "story-reviewer/style"],
  recordedBy: ["story-recorder/inventory", "story-recorder/mechanics", "story-recorder/memory"],
  endsAt: "2026-09-30T09:39:00.000Z",
} as const satisfies StoryTurnPlayed
