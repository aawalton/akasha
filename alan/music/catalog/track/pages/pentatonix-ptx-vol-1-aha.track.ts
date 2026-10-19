import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const pentatonixPtxVol1Aha = {
  id: "01a1546f-24fd-767b-bd37-20dd907da7f2",
  type: "page-type/track",
  slug: "pentatonix-ptx-vol-1-aha",
  ownLength: 2.6285166666666666,
  ownProgress: 2.6285166666666666,
  partOfCollections: ["release/pentatonix-ptx-vol-1"],
  status: "completed",
  unit: "unit/minutes",
  title: "Aha!",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/pentatonix" }],
  trackKey: "aha|26AHtbjWKiwYzsoGoUZq53|157711",
  song: "song/pentatonix-aha",
  carriedBy: [
    {
      release: "release/pentatonix-ptx-vol-1",
      discNumber: 1,
      position: 4,
      externalId: "5AspukpHyZuTciR17YPSrS",
      externalLink: "https://open.spotify.com/track/5AspukpHyZuTciR17YPSrS",
    },
  ],
  createdAt: "2026-10-19T13:52:12.521Z",
  updatedAt: "2026-10-19T14:01:21.162Z",
  progressedAt: "2026-10-19T14:01:21.162Z",
} as const satisfies Track
