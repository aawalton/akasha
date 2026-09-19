import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeTwilightZoneTwilightZone = {
  id: "01a0a6c5-31d9-7512-bc96-1a0503af34e7",
  type: "page-type/track",
  slug: "ariana-grande-twilight-zone-twilight-zone",
  ownLength: 3.3053333333333335,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-twilight-zone"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1SdJK81uqfXNIhlZI9vjlg",
      externalLink: "https://open.spotify.com/track/1SdJK81uqfXNIhlZI9vjlg",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "twilight zone",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" }],
  trackKey: "twilightzone|66CXWjxzNUsdJxJ2JdwvnR|198320",
  song: "song/ariana-grande-twilight-zone",
} as const satisfies Track
