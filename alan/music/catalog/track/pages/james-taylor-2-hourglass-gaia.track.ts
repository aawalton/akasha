import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2HourglassGaia = {
  id: "01a0abeb-3a46-7dad-a1c1-7a760e7d00a0",
  type: "page-type/track",
  slug: "james-taylor-2-hourglass-gaia",
  ownLength: 5.4811,
  ownProgress: 5.4811,
  partOfCollections: ["release/james-taylor-2-hourglass"],
  status: "completed",
  unit: "unit/minutes",
  title: "Gaia",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/james-taylor" }],
  trackKey: "gaia|0vn7UBvSQECKJm2817Yf1P|328866",
  song: "song/james-taylor-gaia",
  carriedBy: [
    {
      release: "release/james-taylor-2-hourglass",
      discNumber: 1,
      position: 4,
      externalId: "4HvUn2UZobWGX6BLijuaru",
      externalLink: "https://open.spotify.com/track/4HvUn2UZobWGX6BLijuaru",
    },
  ],
  createdAt: "2026-09-16T20:31:54.950Z",
  updatedAt: "2026-09-24T19:59:43.000Z",
} as const satisfies Track
