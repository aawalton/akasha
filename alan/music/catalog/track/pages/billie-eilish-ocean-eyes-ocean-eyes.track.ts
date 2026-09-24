import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const billieEilishOceanEyesOceanEyes = {
  id: "01a0b638-ee81-7607-9c58-44e228e0a3cc",
  type: "page-type/track",
  slug: "billie-eilish-ocean-eyes-ocean-eyes",
  ownLength: 3.3426666666666667,
  ownProgress: 3.3426666666666667,
  partOfCollections: ["release/billie-eilish-ocean-eyes"],
  status: "completed",
  unit: "unit/minutes",
  title: "ocean eyes",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/billie-eilish" }],
  trackKey: "oceaneyes|6qqNVTkY8uBg9cP3Jd7DAH|200560",
  song: "song/billie-eilish-ocean-eyes",
  carriedBy: [
    {
      release: "release/billie-eilish-ocean-eyes",
      discNumber: 1,
      position: 1,
      externalId: "2uIX8YMNjGMD7441kqyyNU",
      externalLink: "https://open.spotify.com/track/2uIX8YMNjGMD7441kqyyNU",
    },
  ],
} as const satisfies Track
