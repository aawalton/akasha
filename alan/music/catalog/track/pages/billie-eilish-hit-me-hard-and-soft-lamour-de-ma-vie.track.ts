import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const billieEilishHitMeHardAndSoftLamourDeMaVie = {
  id: "01a0b638-e30f-7e31-b49c-b7ff12272a6f",
  type: "page-type/track",
  slug: "billie-eilish-hit-me-hard-and-soft-lamour-de-ma-vie",
  ownLength: 5.566433333333333,
  ownProgress: 0,
  partOfCollections: ["release/billie-eilish-hit-me-hard-and-soft"],
  position: 7,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6fPan2saHdFaIHuTSatORv",
      externalLink: "https://open.spotify.com/track/6fPan2saHdFaIHuTSatORv",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "L’AMOUR DE MA VIE",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6qqNVTkY8uBg9cP3Jd7DAH", artistName: "Billie Eilish" }],
  trackKey: "lamourdemavie|6qqNVTkY8uBg9cP3Jd7DAH|333986",
  song: "song/billie-eilish-l-amour-de-ma-vie",
} as const satisfies Track
