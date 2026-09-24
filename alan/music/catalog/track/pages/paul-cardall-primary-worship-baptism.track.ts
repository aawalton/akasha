import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallPrimaryWorshipBaptism = {
  id: "01a0b4c8-5592-7af4-993c-1358d9e32abf",
  type: "page-type/track",
  slug: "paul-cardall-primary-worship-baptism",
  ownLength: 3.67355,
  ownProgress: 3.67355,
  partOfCollections: ["release/paul-cardall-primary-worship"],
  status: "completed",
  unit: "unit/minutes",
  title: "Baptism",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "baptism|7FQRbf8gbKw8KZQZAJWxH2|220413",
  song: "song/paul-cardall-baptism",
  carriedBy: [
    {
      release: "release/paul-cardall-primary-worship",
      discNumber: 1,
      position: 1,
      externalId: "3OrEC0ZOxqN2WhG7Pr5DPz",
      externalLink: "https://open.spotify.com/track/3OrEC0ZOxqN2WhG7Pr5DPz",
    },
  ],
} as const satisfies Track
