import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallTheLookingGlassFaithInSpring = {
  id: "01a0b4c8-6196-71b4-b49a-031ef2099f2b",
  type: "page-type/track",
  slug: "paul-cardall-the-looking-glass-faith-in-spring",
  ownLength: 2.3848833333333332,
  ownProgress: 2.3848833333333332,
  partOfCollections: ["release/paul-cardall-the-looking-glass"],
  status: "completed",
  unit: "unit/minutes",
  title: "Faith In Spring",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "faithinspring|7FQRbf8gbKw8KZQZAJWxH2|143093",
  song: "song/paul-cardall-faith-in-spring",
  carriedBy: [
    {
      release: "release/paul-cardall-the-looking-glass",
      discNumber: 1,
      position: 11,
      externalId: "28DUyTFjufXwQE961pinzv",
      externalLink: "https://open.spotify.com/track/28DUyTFjufXwQE961pinzv",
    },
  ],
} as const satisfies Track
