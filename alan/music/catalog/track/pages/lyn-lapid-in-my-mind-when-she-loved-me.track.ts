import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const lynLapidInMyMindWhenSheLovedMe = {
  id: "01a0c95e-c539-793b-8719-db8ef8f4760e",
  type: "page-type/track",
  slug: "lyn-lapid-in-my-mind-when-she-loved-me",
  ownLength: 3.1284833333333335,
  ownProgress: 3.1284833333333335,
  partOfCollections: ["release/lyn-lapid-in-my-mind", "release/lyn-lapid-when-she-loved-me"],
  status: "completed",
  unit: "unit/minutes",
  title: "When She Loved Me",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/lyn-lapid" }],
  trackKey: "whenshelovedme|4pfy05cNNTacuOQ6SiSu4v|187709",
  song: "song/lyn-lapid-when-she-loved-me",
  carriedBy: [
    {
      release: "release/lyn-lapid-in-my-mind",
      discNumber: 1,
      position: 5,
      externalId: "3nWhaZlR2hqqvkgDzulQhK",
      externalLink: "https://open.spotify.com/track/3nWhaZlR2hqqvkgDzulQhK",
    },
    {
      release: "release/lyn-lapid-when-she-loved-me",
      discNumber: 1,
      position: 1,
      externalId: "3198LMj0bpnXj8Mb1GLo3u",
      externalLink: "https://open.spotify.com/track/3198LMj0bpnXj8Mb1GLo3u",
    },
  ],
} as const satisfies Track
