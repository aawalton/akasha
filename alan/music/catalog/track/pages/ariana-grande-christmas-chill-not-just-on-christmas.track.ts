import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeChristmasChillNotJustOnChristmas = {
  id: "01a0a6c5-3a47-7e7b-ac93-9a403435d4e0",
  type: "page-type/track",
  slug: "ariana-grande-christmas-chill-not-just-on-christmas",
  ownLength: 2.0457666666666667,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-christmas-chill"],
  position: 4,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "29SZX6DJdXnFEV2a34qAm4",
      externalLink: "https://open.spotify.com/track/29SZX6DJdXnFEV2a34qAm4",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Not Just On Christmas",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" }],
  trackKey: "notjustonchristmas|66CXWjxzNUsdJxJ2JdwvnR|122746",
  song: "song/ariana-grande-not-just-on-christmas",
} as const satisfies Track
