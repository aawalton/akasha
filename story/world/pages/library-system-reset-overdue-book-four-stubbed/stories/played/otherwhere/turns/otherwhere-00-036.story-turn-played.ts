import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhere00036 = {
  id: "01a0e542-52f2-73e9-9854-e2001fa239a3",
  type: "page-type/story-turn-played",
  slug: "otherwhere-00-036",
  ownLength: 91,
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere"],
  position: 36,
  prose: "txt",
  characters: ["character-player/otherwhere-alan", "character-other/otherwhere-links"],
  turnStatus: "turn-status/reviewers",
  action:
    "“Okay, what about a bath? I not need a rest at least before I go after that big bookworm.”",
  beats: [
    "Nala asks about a bath, and says she needs a rest at least before she goes after the big one.",
    "Links's ears twitch. \"You're synced. The Librarian's quarters are yours now.\"",
    '"Behind the Check-in Counter, off the hall. A bed, a wardrobe, and a bathroom with a stone tub."',
    "\"It's all dusty. Nobody's slept there in centuries,\" he adds, a little quieter.",
    '"The taps run cold. Hot water needs more power than I\'ve got."',
    '"The wardrobe has an old Librarian\'s robes. Better than that," he says, eyeing her bloody shirt.',
  ],
  lore: ["place/otherwhere-main-hall"],
} as const satisfies StoryTurnPlayed
