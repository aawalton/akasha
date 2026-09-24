import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const billieEilishDontSmileAtMeCopycat = {
  id: "01a0b638-eb46-718c-806f-df4670d0ce83",
  type: "page-type/track",
  slug: "billie-eilish-dont-smile-at-me-copycat",
  ownLength: 3.2451833333333333,
  ownProgress: 3.2451833333333333,
  partOfCollections: ["release/billie-eilish-dont-smile-at-me"],
  status: "completed",
  unit: "unit/minutes",
  title: "COPYCAT",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/billie-eilish" }],
  trackKey: "copycat|6qqNVTkY8uBg9cP3Jd7DAH|194711",
  song: "song/billie-eilish-copycat",
  carriedBy: [
    {
      release: "release/billie-eilish-dont-smile-at-me",
      discNumber: 1,
      position: 1,
      externalId: "5w7wuzMzsDer96KqxafeRK",
      externalLink: "https://open.spotify.com/track/5w7wuzMzsDer96KqxafeRK",
    },
  ],
} as const satisfies Track
