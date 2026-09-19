import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeYoursTrulyTenthAnniversaryEditionLovinIt = {
  id: "01a0a6c5-1cea-7757-bad7-d6da1d1bce83",
  type: "page-type/track",
  slug: "ariana-grande-yours-truly-tenth-anniversary-edition-lovin-it",
  ownLength: 3.0115666666666665,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-yours-truly-tenth-anniversary-edition"],
  position: 5,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4EjLfjUNonstEf9ZED4gce",
      externalLink: "https://open.spotify.com/track/4EjLfjUNonstEf9ZED4gce",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Lovin' It",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" }],
  trackKey: "lovinit|66CXWjxzNUsdJxJ2JdwvnR|180694",
  song: "song/ariana-grande-lovin-it",
} as const satisfies Track
