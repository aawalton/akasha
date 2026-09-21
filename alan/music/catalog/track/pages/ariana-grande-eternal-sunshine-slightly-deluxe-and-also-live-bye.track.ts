import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeEternalSunshineSlightlyDeluxeAndAlsoLiveBye = {
  id: "01a0a6c5-1358-7f0f-909c-5e6b5b8e3479",
  type: "page-type/track",
  slug: "ariana-grande-eternal-sunshine-slightly-deluxe-and-also-live-bye",
  ownLength: 2.7487833333333334,
  ownProgress: 2.7487833333333334,
  partOfCollections: ["release/ariana-grande-eternal-sunshine-slightly-deluxe-and-also-live"],
  position: 2,
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3ogYLHbcHcJnbc16dAjhjt",
      externalLink: "https://open.spotify.com/track/3ogYLHbcHcJnbc16dAjhjt",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "bye",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" }],
  trackKey: "bye|66CXWjxzNUsdJxJ2JdwvnR|164927",
  song: "song/ariana-grande-bye",
  carriedBy: [
    {
      release: "release/ariana-grande-eternal-sunshine-slightly-deluxe-and-also-live",
      discNumber: 1,
      position: 2,
      externalId: "3ogYLHbcHcJnbc16dAjhjt",
      externalLink: "https://open.spotify.com/track/3ogYLHbcHcJnbc16dAjhjt",
    },
  ],
} as const satisfies Track
