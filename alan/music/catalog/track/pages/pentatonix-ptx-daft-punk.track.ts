import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const pentatonixPtxDaftPunk = {
  id: "01a1546f-24fc-7b9b-ab06-631f42307815",
  type: "page-type/track",
  slug: "pentatonix-ptx-daft-punk",
  ownLength: 4.108,
  ownProgress: 0,
  partOfCollections: ["release/pentatonix-ptx"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Daft Punk",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/pentatonix" }],
  trackKey: "daftpunk|26AHtbjWKiwYzsoGoUZq53|246480",
  song: "song/pentatonix-daft-punk",
  carriedBy: [
    {
      release: "release/pentatonix-ptx",
      discNumber: 1,
      position: 1,
      externalId: "0mkavBIKcfj2WMe7RN1OrQ",
      externalLink: "https://open.spotify.com/track/0mkavBIKcfj2WMe7RN1OrQ",
    },
  ],
  createdAt: "2026-10-19T13:52:12.521Z",
  updatedAt: "2026-10-19T13:52:12.521Z",
} as const satisfies Track
