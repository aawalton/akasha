import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const billieEilishHitMeHardAndSoftBittersuite = {
  id: "01a0b638-e365-766e-9457-8b6df9fb5306",
  type: "page-type/track",
  slug: "billie-eilish-hit-me-hard-and-soft-bittersuite",
  ownLength: 4.974,
  ownProgress: 4.974,
  partOfCollections: ["release/billie-eilish-hit-me-hard-and-soft"],
  status: "completed",
  unit: "unit/minutes",
  title: "BITTERSUITE",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/billie-eilish" }],
  trackKey: "bittersuite|6qqNVTkY8uBg9cP3Jd7DAH|298440",
  song: "song/billie-eilish-bittersuite",
  carriedBy: [
    {
      release: "release/billie-eilish-hit-me-hard-and-soft",
      discNumber: 1,
      position: 9,
      externalId: "7DpUoxGSdlDHfqCYj0otzU",
      externalLink: "https://open.spotify.com/track/7DpUoxGSdlDHfqCYj0otzU",
    },
  ],
} as const satisfies Track
