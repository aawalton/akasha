import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const vinnyMarchiSugarStarsLoveLikeThis = {
  id: "01a0b112-92ed-7ddf-8699-ce411b3e8843",
  type: "page-type/track",
  slug: "vinny-marchi-sugar-stars-love-like-this",
  ownLength: 2.7723666666666666,
  ownProgress: 2.7723666666666666,
  partOfCollections: ["release/vinny-marchi-sugar-stars"],
  status: "completed",
  unit: "unit/minutes",
  title: "love like this",
  trackType: "studio",
  explicit: true,
  trackArtist: [{ artist: "artist/vinny-marchi" }],
  trackKey: "lovelikethis|5USAMqcbMAzF3HBmeD5pJF|166342",
  song: "song/vinny-marchi-love-like-this",
  carriedBy: [
    {
      release: "release/vinny-marchi-sugar-stars",
      discNumber: 1,
      position: 2,
      externalId: "4QbjjiBOp8GN4LdMbK2oLa",
      externalLink: "https://open.spotify.com/track/4QbjjiBOp8GN4LdMbK2oLa",
    },
  ],
} as const satisfies Track
