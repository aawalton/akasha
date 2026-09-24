import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const billieEilishThereforeIAmThereforeIAm = {
  id: "01a0b638-e99f-78fa-80a1-bf1280363df8",
  type: "page-type/track",
  slug: "billie-eilish-therefore-i-am-therefore-i-am",
  ownLength: 2.90535,
  ownProgress: 2.90535,
  partOfCollections: ["release/billie-eilish-therefore-i-am"],
  status: "completed",
  unit: "unit/minutes",
  title: "Therefore I Am",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/billie-eilish" }],
  trackKey: "thereforeiam|6qqNVTkY8uBg9cP3Jd7DAH|174321",
  song: "song/billie-eilish-therefore-i-am",
  carriedBy: [
    {
      release: "release/billie-eilish-therefore-i-am",
      discNumber: 1,
      position: 1,
      externalId: "54bFM56PmE4YLRnqpW6Tha",
      externalLink: "https://open.spotify.com/track/54bFM56PmE4YLRnqpW6Tha",
    },
  ],
} as const satisfies Track
