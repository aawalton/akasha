import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const pentatonixPtxNaturalDisaster = {
  id: "01a1546f-24fc-7ce3-a4d3-a52494de2845",
  type: "page-type/track",
  slug: "pentatonix-ptx-natural-disaster",
  ownLength: 3.494,
  ownProgress: 0,
  partOfCollections: ["release/pentatonix-ptx"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Natural Disaster",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/pentatonix" }],
  trackKey: "naturaldisaster|26AHtbjWKiwYzsoGoUZq53|209640",
  song: "song/pentatonix-natural-disaster",
  carriedBy: [
    {
      release: "release/pentatonix-ptx",
      discNumber: 1,
      position: 13,
      externalId: "0Lr2QQkGY3wXv15Nnuc1zI",
      externalLink: "https://open.spotify.com/track/0Lr2QQkGY3wXv15Nnuc1zI",
    },
  ],
  createdAt: "2026-10-19T13:52:12.521Z",
  updatedAt: "2026-10-19T13:52:12.521Z",
} as const satisfies Track
