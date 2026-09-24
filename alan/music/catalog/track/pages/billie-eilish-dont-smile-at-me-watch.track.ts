import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const billieEilishDontSmileAtMeWatch = {
  id: "01a0b638-ebbd-731c-9d4d-b46887a9c756",
  type: "page-type/track",
  slug: "billie-eilish-dont-smile-at-me-watch",
  ownLength: 2.9587166666666667,
  ownProgress: 2.9587166666666667,
  partOfCollections: ["release/billie-eilish-dont-smile-at-me"],
  status: "completed",
  unit: "unit/minutes",
  title: "watch",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/billie-eilish" }],
  trackKey: "watch|6qqNVTkY8uBg9cP3Jd7DAH|177523",
  song: "song/billie-eilish-watch",
  carriedBy: [
    {
      release: "release/billie-eilish-dont-smile-at-me",
      discNumber: 1,
      position: 4,
      externalId: "7eB1V5LvAdxCc7brfGhRRo",
      externalLink: "https://open.spotify.com/track/7eB1V5LvAdxCc7brfGhRRo",
    },
  ],
} as const satisfies Track
