import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhere00016 = {
  id: "01a0e49b-fab5-73e0-be55-1578042475a5",
  type: "page-type/story-turn-played",
  slug: "otherwhere-00-016",
  ownLength: 160,
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere"],
  position: 16,
  prose: "txt",
  characters: [
    "character-player/otherwhere-alan",
    "character-other/otherwhere-links",
    "character-other/otherwhere-engorged-bookworm-01",
  ],
  turnStatus: "turn-status/reviewers",
  action: "I keep it there until it stops moving",
  beats: [
    "She keeps her weight on it and holds it down in the salt.",
    "Its heaves come smaller and further apart, and the salt crackles against its skin.",
    "Then it all goes at once: the whole body draws in, shrinks and curls tight under her hands.",
    "It goes still, dried to a hard grey coil no bigger than a rolled-up newspaper.",
    "Its mouth is shut; she can feel through her palms that it is still alive, only helpless.",
    "She lets go and sits back on her heels, breathing hard; it doesn't move.",
    "Overhead, the gold light in the hall brightens, just a shade, as if something has eased.",
    "Links pads over and sniffs at the dried coil in the salt, whiskers twitching.",
    '"One," he says. His runes slide slowly over his flanks. "Dried, not dead."',
  ],
  lore: ["place/otherwhere-main-hall"],
  reviewedBy: ["story-reviewer/style"],
} as const satisfies StoryTurnPlayed
