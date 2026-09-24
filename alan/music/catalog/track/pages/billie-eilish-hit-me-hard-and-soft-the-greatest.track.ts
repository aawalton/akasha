import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const billieEilishHitMeHardAndSoftTheGreatest = {
  id: "01a0b638-e2e7-71df-b0cf-52d3c8d919f6",
  type: "page-type/track",
  slug: "billie-eilish-hit-me-hard-and-soft-the-greatest",
  ownLength: 4.897333333333333,
  ownProgress: 4.897333333333333,
  partOfCollections: ["release/billie-eilish-hit-me-hard-and-soft"],
  status: "completed",
  unit: "unit/minutes",
  title: "THE GREATEST",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/billie-eilish" }],
  trackKey: "thegreatest|6qqNVTkY8uBg9cP3Jd7DAH|293840",
  song: "song/billie-eilish-the-greatest",
  carriedBy: [
    {
      release: "release/billie-eilish-hit-me-hard-and-soft",
      discNumber: 1,
      position: 6,
      externalId: "6TGd66r0nlPaYm3KIoI7ET",
      externalLink: "https://open.spotify.com/track/6TGd66r0nlPaYm3KIoI7ET",
    },
  ],
} as const satisfies Track
