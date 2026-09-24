import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jessicaBaioHomeHome = {
  id: "01a0c622-2495-7cc3-8c88-f84825a83f42",
  type: "page-type/track",
  slug: "jessica-baio-home-home",
  ownLength: 2.9703166666666667,
  ownProgress: 2.9703166666666667,
  partOfCollections: ["release/jessica-baio-home"],
  status: "completed",
  unit: "unit/minutes",
  title: "home",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/jessica-baio" }],
  trackKey: "home|0VMFTqmv0hYlWruyBERT95|178219",
  song: "song/jessica-baio-home",
  carriedBy: [
    {
      release: "release/jessica-baio-home",
      discNumber: 1,
      position: 1,
      externalId: "3Y79CXA7VtCv9GiyMJujBo",
      externalLink: "https://open.spotify.com/track/3Y79CXA7VtCv9GiyMJujBo",
    },
  ],
} as const satisfies Track
