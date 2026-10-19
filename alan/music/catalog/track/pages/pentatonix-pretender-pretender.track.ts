import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const pentatonixPretenderPretender = {
  id: "01a1546f-24fc-795a-89a3-dae30b561748",
  type: "page-type/track",
  slug: "pentatonix-pretender-pretender",
  ownLength: 2.9208,
  ownProgress: 0,
  partOfCollections: ["release/pentatonix-pretender"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Pretender",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/pentatonix" }],
  trackKey: "pretender|26AHtbjWKiwYzsoGoUZq53|175248",
  song: "song/pentatonix-pretender",
  carriedBy: [
    {
      release: "release/pentatonix-pretender",
      discNumber: 1,
      position: 1,
      externalId: "5YwsqaWSMPrzvyDekJS7aA",
      externalLink: "https://open.spotify.com/track/5YwsqaWSMPrzvyDekJS7aA",
    },
  ],
  createdAt: "2026-10-19T13:52:12.521Z",
  updatedAt: "2026-10-19T13:52:12.521Z",
} as const satisfies Track
