import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const enyaWatermarkTheLongships = {
  id: "01a14a1d-db59-729c-9e95-6730955738a5",
  type: "page-type/track",
  slug: "enya-watermark-the-longships",
  ownLength: 3.65555,
  ownProgress: 0,
  partOfCollections: ["release/enya-watermark"],
  status: "not-started",
  unit: "unit/minutes",
  title: "The Longships",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/enya" }],
  trackKey: "thelongships|6uothxMWeLWIhsGeF7cyo4|219333",
  song: "song/enya-the-longships",
  carriedBy: [
    {
      release: "release/enya-watermark",
      discNumber: 1,
      position: 10,
      externalId: "1KYwpvwfrQQNnw2C0x8iGb",
      externalLink: "https://open.spotify.com/track/1KYwpvwfrQQNnw2C0x8iGb",
    },
  ],
  createdAt: "2026-10-17T13:47:13.085Z",
  updatedAt: "2026-10-17T13:47:13.085Z",
} as const satisfies Track
