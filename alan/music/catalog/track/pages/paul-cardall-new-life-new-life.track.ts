import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallNewLifeNewLife = {
  id: "01a0b4c8-403c-735d-9b5d-349360d4c585",
  type: "page-type/track",
  slug: "paul-cardall-new-life-new-life",
  ownLength: 3.5622166666666666,
  ownProgress: 3.5622166666666666,
  partOfCollections: ["release/paul-cardall-new-life"],
  status: "completed",
  unit: "unit/minutes",
  title: "New Life",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "newlife|7FQRbf8gbKw8KZQZAJWxH2|213733",
  song: "song/paul-cardall-new-life",
  carriedBy: [
    {
      release: "release/paul-cardall-new-life",
      discNumber: 1,
      position: 13,
      externalId: "65jYrSodnJTrBVTD67e5Y3",
      externalLink: "https://open.spotify.com/track/65jYrSodnJTrBVTD67e5Y3",
    },
  ],
} as const satisfies Track
