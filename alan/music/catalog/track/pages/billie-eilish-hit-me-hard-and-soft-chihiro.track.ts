import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const billieEilishHitMeHardAndSoftChihiro = {
  id: "01a0b638-e275-7e84-a80b-20c3dd8319cd",
  type: "page-type/track",
  slug: "billie-eilish-hit-me-hard-and-soft-chihiro",
  ownLength: 5.057333333333333,
  ownProgress: 5.057333333333333,
  partOfCollections: ["release/billie-eilish-hit-me-hard-and-soft"],
  status: "completed",
  unit: "unit/minutes",
  title: "CHIHIRO",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/billie-eilish" }],
  trackKey: "chihiro|6qqNVTkY8uBg9cP3Jd7DAH|303440",
  song: "song/billie-eilish-chihiro",
  carriedBy: [
    {
      release: "release/billie-eilish-hit-me-hard-and-soft",
      discNumber: 1,
      position: 3,
      externalId: "7BRD7x5pt8Lqa1eGYC4dzj",
      externalLink: "https://open.spotify.com/track/7BRD7x5pt8Lqa1eGYC4dzj",
    },
  ],
} as const satisfies Track
