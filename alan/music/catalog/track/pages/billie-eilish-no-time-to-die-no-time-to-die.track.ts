import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const billieEilishNoTimeToDieNoTimeToDie = {
  id: "01a0b638-e9e3-7ec3-a957-0e16045e5227",
  type: "page-type/track",
  slug: "billie-eilish-no-time-to-die-no-time-to-die",
  ownLength: 4.03775,
  ownProgress: 4.03775,
  partOfCollections: ["release/billie-eilish-no-time-to-die"],
  status: "completed",
  unit: "unit/minutes",
  title: "No Time To Die",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/billie-eilish" }],
  trackKey: "notimetodie|6qqNVTkY8uBg9cP3Jd7DAH|242265",
  song: "song/billie-eilish-no-time-to-die",
  carriedBy: [
    {
      release: "release/billie-eilish-no-time-to-die",
      discNumber: 1,
      position: 1,
      externalId: "73SpzrcaHk0RQPFP73vqVR",
      externalLink: "https://open.spotify.com/track/73SpzrcaHk0RQPFP73vqVR",
    },
  ],
} as const satisfies Track
