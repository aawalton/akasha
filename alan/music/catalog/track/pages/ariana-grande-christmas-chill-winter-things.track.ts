import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeChristmasChillWinterThings = {
  id: "01a0a6c5-3a8b-7c03-9b2f-466a5ef27021",
  type: "page-type/track",
  slug: "ariana-grande-christmas-chill-winter-things",
  ownLength: 2.6443666666666665,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-christmas-chill"],
  position: 6,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2LdWTutlhGH6Zqpp7IAiZc",
      externalLink: "https://open.spotify.com/track/2LdWTutlhGH6Zqpp7IAiZc",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Winter Things",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" }],
  trackKey: "winterthings|66CXWjxzNUsdJxJ2JdwvnR|158662",
  song: "song/ariana-grande-winter-things",
} as const satisfies Track
