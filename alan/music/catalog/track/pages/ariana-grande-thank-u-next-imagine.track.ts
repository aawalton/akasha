import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeThankUNextImagine = {
  id: "01a0a6c5-2753-7e1e-a86e-b65a0b334445",
  type: "page-type/track",
  slug: "ariana-grande-thank-u-next-imagine",
  ownLength: 3.5377666666666667,
  ownProgress: 3.5377666666666667,
  partOfCollections: ["release/ariana-grande-thank-u-next"],
  position: 1,
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "39LmTF9RgyakzSYX8txrow",
      externalLink: "https://open.spotify.com/track/39LmTF9RgyakzSYX8txrow",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "imagine",
  trackType: "studio",
  discNumber: 1,
  explicit: true,
  trackArtist: [{ externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" }],
  trackKey: "imagine|66CXWjxzNUsdJxJ2JdwvnR|212266",
  song: "song/ariana-grande-imagine",
  carriedBy: [
    {
      release: "release/ariana-grande-thank-u-next",
      discNumber: 1,
      position: 1,
      externalId: "39LmTF9RgyakzSYX8txrow",
      externalLink: "https://open.spotify.com/track/39LmTF9RgyakzSYX8txrow",
    },
  ],
} as const satisfies Track
