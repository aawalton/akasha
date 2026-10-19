import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const pentatonixTheLuckyOnesDeluxeSide = {
  id: "01a1546f-2501-752e-94df-3419fe7ca32a",
  type: "page-type/track",
  slug: "pentatonix-the-lucky-ones-deluxe-side",
  ownLength: 3.4651,
  ownProgress: 0,
  partOfCollections: ["release/pentatonix-the-lucky-ones-deluxe"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Side",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/pentatonix" }],
  trackKey: "side|26AHtbjWKiwYzsoGoUZq53|207906",
  song: "song/pentatonix-side",
  carriedBy: [
    {
      release: "release/pentatonix-the-lucky-ones-deluxe",
      discNumber: 1,
      position: 6,
      externalId: "2UFmlXZwRnwEgD1UoaAAYe",
      externalLink: "https://open.spotify.com/track/2UFmlXZwRnwEgD1UoaAAYe",
    },
  ],
  createdAt: "2026-10-19T13:52:12.521Z",
  updatedAt: "2026-10-19T13:52:12.521Z",
} as const satisfies Track
