import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const enyaWatermarkExile = {
  id: "01a14a1d-db58-79ad-bc5e-e7ecbb8ac5ff",
  type: "page-type/track",
  slug: "enya-watermark-exile",
  ownLength: 4.362666666666667,
  ownProgress: 4.362666666666667,
  partOfCollections: ["release/enya-watermark"],
  status: "completed",
  unit: "unit/minutes",
  title: "Exile",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/enya" }],
  trackKey: "exile|6uothxMWeLWIhsGeF7cyo4|261760",
  song: "song/enya-exile",
  carriedBy: [
    {
      release: "release/enya-watermark",
      discNumber: 1,
      position: 5,
      externalId: "2hMD3SnrBsre1mzptGRn6Z",
      externalLink: "https://open.spotify.com/track/2hMD3SnrBsre1mzptGRn6Z",
    },
  ],
  createdAt: "2026-10-17T13:47:13.085Z",
  updatedAt: "2026-10-17T14:00:54.619Z",
} as const satisfies Track
