import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const pentatonixEvergreenLittleSaintNick = {
  id: "01a1546f-24f7-7bb8-86ed-4ad90fce6ccd",
  type: "page-type/track",
  slug: "pentatonix-evergreen-little-saint-nick",
  ownLength: 2.04405,
  ownProgress: 0,
  partOfCollections: ["release/pentatonix-evergreen"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Little Saint Nick",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/pentatonix" }],
  trackKey: "littlesaintnick|26AHtbjWKiwYzsoGoUZq53|122643",
  song: "song/pentatonix-little-saint-nick",
  carriedBy: [
    {
      release: "release/pentatonix-evergreen",
      discNumber: 1,
      position: 11,
      externalId: "3atIymF2ABwxtsO50SB639",
      externalLink: "https://open.spotify.com/track/3atIymF2ABwxtsO50SB639",
    },
  ],
  createdAt: "2026-10-19T13:52:12.521Z",
  updatedAt: "2026-10-19T13:52:12.521Z",
} as const satisfies Track
