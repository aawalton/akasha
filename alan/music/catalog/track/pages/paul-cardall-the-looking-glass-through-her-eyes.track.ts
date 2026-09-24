import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallTheLookingGlassThroughHerEyes = {
  id: "01a0b4c8-60cf-72a9-8b09-7c12d2f57144",
  type: "page-type/track",
  slug: "paul-cardall-the-looking-glass-through-her-eyes",
  ownLength: 3.3388833333333334,
  ownProgress: 3.3388833333333334,
  partOfCollections: ["release/paul-cardall-the-looking-glass"],
  status: "completed",
  unit: "unit/minutes",
  title: "Through Her Eyes",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "throughhereyes|7FQRbf8gbKw8KZQZAJWxH2|200333",
  song: "song/paul-cardall-through-her-eyes",
  carriedBy: [
    {
      release: "release/paul-cardall-the-looking-glass",
      discNumber: 1,
      position: 5,
      externalId: "0caZUZPv4whG4XjnLbcI0Z",
      externalLink: "https://open.spotify.com/track/0caZUZPv4whG4XjnLbcI0Z",
    },
  ],
} as const satisfies Track
