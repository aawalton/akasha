import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const billieEilishSixFeetUnderSixFeetUnder = {
  id: "01a0b638-eeae-7ad6-bdf5-1ebcd5979a84",
  type: "page-type/track",
  slug: "billie-eilish-six-feet-under-six-feet-under",
  ownLength: 3.1602166666666665,
  ownProgress: 3.1602166666666665,
  partOfCollections: ["release/billie-eilish-six-feet-under"],
  status: "completed",
  unit: "unit/minutes",
  title: "Six Feet Under",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/billie-eilish" }],
  trackKey: "sixfeetunder|6qqNVTkY8uBg9cP3Jd7DAH|189613",
  song: "song/billie-eilish-six-feet-under",
  carriedBy: [
    {
      release: "release/billie-eilish-six-feet-under",
      discNumber: 1,
      position: 1,
      externalId: "2VlLbhGLVJgdOW7kKdWWFc",
      externalLink: "https://open.spotify.com/track/2VlLbhGLVJgdOW7kKdWWFc",
    },
  ],
} as const satisfies Track
