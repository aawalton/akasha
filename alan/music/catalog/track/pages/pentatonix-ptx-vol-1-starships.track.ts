import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const pentatonixPtxVol1Starships = {
  id: "01a1546f-24fd-721f-9027-74e59bdcb490",
  type: "page-type/track",
  slug: "pentatonix-ptx-vol-1-starships",
  ownLength: 3.03105,
  ownProgress: 0,
  partOfCollections: ["release/pentatonix-ptx-vol-1"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Starships",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/pentatonix" }],
  trackKey: "starships|26AHtbjWKiwYzsoGoUZq53|181863",
  song: "song/pentatonix-starships",
  carriedBy: [
    {
      release: "release/pentatonix-ptx-vol-1",
      discNumber: 1,
      position: 1,
      externalId: "28KAxjOTAnnGjGpC2Qx8gn",
      externalLink: "https://open.spotify.com/track/28KAxjOTAnnGjGpC2Qx8gn",
    },
  ],
  createdAt: "2026-10-19T13:52:12.521Z",
  updatedAt: "2026-10-19T13:52:12.521Z",
} as const satisfies Track
