import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallNewLifeFatherInHeaven = {
  id: "01a0b4c8-3ff1-764f-9801-03b73ba2072b",
  type: "page-type/track",
  slug: "paul-cardall-new-life-father-in-heaven",
  ownLength: 1.668,
  ownProgress: 1.668,
  partOfCollections: ["release/paul-cardall-new-life"],
  status: "completed",
  unit: "unit/minutes",
  title: "Father in Heaven",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "fatherinheaven|7FQRbf8gbKw8KZQZAJWxH2|100080",
  song: "song/paul-cardall-father-in-heaven",
  carriedBy: [
    {
      release: "release/paul-cardall-new-life",
      discNumber: 1,
      position: 11,
      externalId: "3HCpWKRsBhQ6xHzcAMNzBc",
      externalLink: "https://open.spotify.com/track/3HCpWKRsBhQ6xHzcAMNzBc",
    },
  ],
} as const satisfies Track
