import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhere00045 = {
  id: "01a0e586-2417-7e36-aa5d-0de2e6d439ca",
  type: "page-type/story-turn-played",
  slug: "otherwhere-00-045",
  ownLength: 157,
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere"],
  position: 45,
  prose: "txt",
  characters: ["character-player/otherwhere-alan", "character-other/otherwhere-links"],
  turnStatus: "turn-status/recorders",
  action:
    "I pull myself up, pick up the third bag, for one more attempt. This time, as soon as the bag goes in, I leave as quick as I can manage.",
  beats: [
    "Nala hauls herself up by the honey jar and gets the last sack into her arms.",
    "She can't run; she staggers toward the worm, every step jolting her battered body.",
    "It swings its gagging mouth toward her, and she shoves the sack at it.",
    "The sack bursts short, in the front of its mouth; salt sprays, and the worm reels back from it.",
    "She turns to get away, but the worm's heavy head swings round and slams into her.",
    "She goes down hard, and the hall goes dark again.",
    "In the dark, drawn by the honey under her crust, the worm's teeth close on her.",
    "Its mouth fills with salt; it lets go, shrieking, and drags itself back into the gloom.",
    "Nala comes round on the floor, a deep fresh bite bleeding into the salt, too weak to rise.",
    "Links crouches over her, fur flat, watching the gloom where the worm has gone.",
  ],
  lore: ["place/otherwhere-hall-back"],
  reviewedBy: ["story-reviewer/style", "story-reviewer/continuity"],
  recordedBy: ["story-recorder/memory", "story-recorder/mechanics"],
} as const satisfies StoryTurnPlayed
