import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const billieEilishHappierThanEverIDidntChangeMyNumber = {
  id: "01a0b638-e3c9-7001-ac29-db3e428d0283",
  type: "page-type/track",
  slug: "billie-eilish-happier-than-ever-i-didnt-change-my-number",
  ownLength: 2.64105,
  ownProgress: 2.64105,
  partOfCollections: ["release/billie-eilish-happier-than-ever"],
  status: "completed",
  unit: "unit/minutes",
  title: "I Didn't Change My Number",
  trackType: "studio",
  explicit: true,
  trackArtist: [{ artist: "artist/billie-eilish" }],
  trackKey: "ididntchangemynumber|6qqNVTkY8uBg9cP3Jd7DAH|158463",
  song: "song/billie-eilish-i-didn-t-change-my-number",
  carriedBy: [
    {
      release: "release/billie-eilish-happier-than-ever",
      discNumber: 1,
      position: 2,
      externalId: "7bcy34fBT2ap1L4bfPsl9q",
      externalLink: "https://open.spotify.com/track/7bcy34fBT2ap1L4bfPsl9q",
    },
  ],
} as const satisfies Track
