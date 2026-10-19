import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const pentatonixHavanaHavana = {
  id: "01a1546f-24f8-74a1-8d4a-05e31b28b871",
  type: "page-type/track",
  slug: "pentatonix-havana-havana",
  ownLength: 2.5683833333333332,
  ownProgress: 0,
  partOfCollections: ["release/pentatonix-havana"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Havana",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/pentatonix" }],
  trackKey: "havana|26AHtbjWKiwYzsoGoUZq53|154103",
  song: "song/pentatonix-havana",
  carriedBy: [
    {
      release: "release/pentatonix-havana",
      discNumber: 1,
      position: 1,
      externalId: "5vLmZ6ya1RGLoLeNwA82hY",
      externalLink: "https://open.spotify.com/track/5vLmZ6ya1RGLoLeNwA82hY",
    },
  ],
  createdAt: "2026-10-19T13:52:12.521Z",
  updatedAt: "2026-10-19T13:52:12.521Z",
} as const satisfies Track
