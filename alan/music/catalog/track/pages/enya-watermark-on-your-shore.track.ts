import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const enyaWatermarkOnYourShore = {
  id: "01a14a1d-db59-747f-bda6-26668ab3a9f1",
  type: "page-type/track",
  slug: "enya-watermark-on-your-shore",
  ownLength: 4.004,
  ownProgress: 0,
  partOfCollections: ["release/enya-watermark"],
  status: "not-started",
  unit: "unit/minutes",
  title: "On Your Shore",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/enya" }],
  trackKey: "onyourshore|6uothxMWeLWIhsGeF7cyo4|240240",
  song: "song/enya-on-your-shore",
  carriedBy: [
    {
      release: "release/enya-watermark",
      discNumber: 1,
      position: 3,
      externalId: "73CMWrPW9B2BYhx3OgRmhl",
      externalLink: "https://open.spotify.com/track/73CMWrPW9B2BYhx3OgRmhl",
    },
  ],
  createdAt: "2026-10-17T13:47:13.085Z",
  updatedAt: "2026-10-17T13:47:13.085Z",
} as const satisfies Track
