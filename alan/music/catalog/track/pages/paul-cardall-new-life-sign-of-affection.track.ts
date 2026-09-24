import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallNewLifeSignOfAffection = {
  id: "01a0b4c8-3f65-78d5-8df3-4e01e8c00687",
  type: "page-type/track",
  slug: "paul-cardall-new-life-sign-of-affection",
  ownLength: 5.116433333333333,
  ownProgress: 5.116433333333333,
  partOfCollections: ["release/paul-cardall-new-life"],
  status: "completed",
  unit: "unit/minutes",
  title: "Sign of Affection",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "signofaffection|7FQRbf8gbKw8KZQZAJWxH2|306986",
  song: "song/paul-cardall-sign-of-affection",
  carriedBy: [
    {
      release: "release/paul-cardall-new-life",
      discNumber: 1,
      position: 7,
      externalId: "6j4D1izL5KfENZ8cPoq396",
      externalLink: "https://open.spotify.com/track/6j4D1izL5KfENZ8cPoq396",
    },
  ],
} as const satisfies Track
