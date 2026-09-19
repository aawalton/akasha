import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraMusicForTheFreeSpiritsGentleEarthquakes = {
  id: "01a0b638-08bb-76ff-ae2d-3bff40572668",
  type: "page-type/track",
  slug: "aurora-music-for-the-free-spirits-gentle-earthquakes",
  ownLength: 3.7888,
  ownProgress: 0,
  partOfCollections: ["release/aurora-music-for-the-free-spirits"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "38c50wSqNxBTAA525vUOJH",
      externalLink: "https://open.spotify.com/track/38c50wSqNxBTAA525vUOJH",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Gentle Earthquakes",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "1WgXqy2Dd70QQOU7Ay074N", artistName: "AURORA" }],
  trackKey: "gentleearthquakes|1WgXqy2Dd70QQOU7Ay074N|227328",
  song: "song/aurora-gentle-earthquakes",
} as const satisfies Track
