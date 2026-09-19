import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const billieEilishHitMeHardAndSoftBittersuite = {
  id: "01a0b638-e365-766e-9457-8b6df9fb5306",
  type: "page-type/track",
  slug: "billie-eilish-hit-me-hard-and-soft-bittersuite",
  ownLength: 4.974,
  ownProgress: 0,
  partOfCollections: ["release/billie-eilish-hit-me-hard-and-soft"],
  position: 9,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7DpUoxGSdlDHfqCYj0otzU",
      externalLink: "https://open.spotify.com/track/7DpUoxGSdlDHfqCYj0otzU",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "BITTERSUITE",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6qqNVTkY8uBg9cP3Jd7DAH", artistName: "Billie Eilish" }],
  trackKey: "bittersuite|6qqNVTkY8uBg9cP3Jd7DAH|298440",
  song: "song/billie-eilish-bittersuite",
} as const satisfies Track
