import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const pentatonixCreepCreep = {
  id: "01a1546f-24f6-70c3-9f39-75dbd435b6d5",
  type: "page-type/track",
  slug: "pentatonix-creep-creep",
  ownLength: 2.45,
  ownProgress: 0,
  partOfCollections: ["release/pentatonix-creep"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Creep",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/pentatonix" }],
  trackKey: "creep|26AHtbjWKiwYzsoGoUZq53|147000",
  song: "song/pentatonix-creep",
  carriedBy: [
    {
      release: "release/pentatonix-creep",
      discNumber: 1,
      position: 1,
      externalId: "2CawJOGy5RPJlxqffZ9Kip",
      externalLink: "https://open.spotify.com/track/2CawJOGy5RPJlxqffZ9Kip",
    },
  ],
  createdAt: "2026-10-19T13:52:12.521Z",
  updatedAt: "2026-10-19T13:52:12.521Z",
} as const satisfies Track
