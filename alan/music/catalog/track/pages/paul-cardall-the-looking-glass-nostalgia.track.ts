import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallTheLookingGlassNostalgia = {
  id: "01a0b4c8-61e4-7f0c-8aed-9413c26b0636",
  type: "page-type/track",
  slug: "paul-cardall-the-looking-glass-nostalgia",
  ownLength: 3.136233333333333,
  ownProgress: 3.136233333333333,
  partOfCollections: ["release/paul-cardall-the-looking-glass"],
  status: "completed",
  unit: "unit/minutes",
  title: "Nostalgia",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "nostalgia|7FQRbf8gbKw8KZQZAJWxH2|188174",
  song: "song/paul-cardall-nostalgia",
  carriedBy: [
    {
      release: "release/paul-cardall-the-looking-glass",
      discNumber: 1,
      position: 13,
      externalId: "7DDIxsZf1cW8LGHg1RzHC7",
      externalLink: "https://open.spotify.com/track/7DDIxsZf1cW8LGHg1RzHC7",
    },
  ],
} as const satisfies Track
