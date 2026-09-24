import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2CoversSuzanne = {
  id: "01a0abeb-3468-7b73-a6a7-54b7eec8326a",
  type: "page-type/track",
  slug: "james-taylor-2-covers-suzanne",
  ownLength: 3.6064333333333334,
  ownProgress: 3.6064333333333334,
  partOfCollections: ["release/james-taylor-2-covers"],
  status: "completed",
  unit: "unit/minutes",
  title: "Suzanne",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/james-taylor" }],
  trackKey: "suzanne|0vn7UBvSQECKJm2817Yf1P|216386",
  song: "song/james-taylor-suzanne",
  carriedBy: [
    {
      release: "release/james-taylor-2-covers",
      discNumber: 1,
      position: 7,
      externalId: "27GMmOPgdi6NEq3dAGZ6et",
      externalLink: "https://open.spotify.com/track/27GMmOPgdi6NEq3dAGZ6et",
    },
  ],
} as const satisfies Track
