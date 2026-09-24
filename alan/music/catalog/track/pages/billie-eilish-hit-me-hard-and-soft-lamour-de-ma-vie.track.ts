import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const billieEilishHitMeHardAndSoftLamourDeMaVie = {
  id: "01a0b638-e30f-7e31-b49c-b7ff12272a6f",
  type: "page-type/track",
  slug: "billie-eilish-hit-me-hard-and-soft-lamour-de-ma-vie",
  ownLength: 5.566433333333333,
  ownProgress: 5.566433333333333,
  partOfCollections: ["release/billie-eilish-hit-me-hard-and-soft"],
  status: "completed",
  unit: "unit/minutes",
  title: "L’AMOUR DE MA VIE",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/billie-eilish" }],
  trackKey: "lamourdemavie|6qqNVTkY8uBg9cP3Jd7DAH|333986",
  song: "song/billie-eilish-l-amour-de-ma-vie",
  carriedBy: [
    {
      release: "release/billie-eilish-hit-me-hard-and-soft",
      discNumber: 1,
      position: 7,
      externalId: "6fPan2saHdFaIHuTSatORv",
      externalLink: "https://open.spotify.com/track/6fPan2saHdFaIHuTSatORv",
    },
  ],
} as const satisfies Track
