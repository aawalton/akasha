import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const pentatonixIRiseIRise = {
  id: "01a1546f-24fa-7777-86b4-45d9978d91b1",
  type: "page-type/track",
  slug: "pentatonix-i-rise-i-rise",
  ownLength: 3.3478166666666667,
  ownProgress: 0,
  partOfCollections: ["release/pentatonix-i-rise"],
  status: "not-started",
  unit: "unit/minutes",
  title: "I Rise",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/pentatonix" }],
  trackKey: "irise|26AHtbjWKiwYzsoGoUZq53|200869",
  song: "song/pentatonix-i-rise",
  carriedBy: [
    {
      release: "release/pentatonix-i-rise",
      discNumber: 1,
      position: 1,
      externalId: "22qKulMO8VijTJGXOig5vN",
      externalLink: "https://open.spotify.com/track/22qKulMO8VijTJGXOig5vN",
    },
  ],
  createdAt: "2026-10-19T13:52:12.521Z",
  updatedAt: "2026-10-19T13:52:12.521Z",
} as const satisfies Track
