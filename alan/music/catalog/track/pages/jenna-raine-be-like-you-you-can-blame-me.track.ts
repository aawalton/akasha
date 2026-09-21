import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jennaRaineBeLikeYouYouCanBlameMe = {
  id: "01a0c621-2746-727d-895e-859c6919e81e",
  type: "page-type/track",
  slug: "jenna-raine-be-like-you-you-can-blame-me",
  ownLength: 3.0277666666666665,
  ownProgress: 3.0277666666666665,
  partOfCollections: ["release/jenna-raine-be-like-you", "release/jenna-raine-you-can-blame-me"],
  status: "completed",
  unit: "unit/minutes",
  title: "You Can Blame Me",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "3aHe9rMa5HFTjXHw8tEz0A", artistName: "Jenna Raine" }],
  trackKey: "youcanblameme|3aHe9rMa5HFTjXHw8tEz0A|181666",
  song: "song/jenna-raine-you-can-blame-me",
  carriedBy: [
    {
      release: "release/jenna-raine-be-like-you",
      discNumber: 1,
      position: 2,
      externalId: "1ERfijuiVJvknfM38lH5cW",
      externalLink: "https://open.spotify.com/track/1ERfijuiVJvknfM38lH5cW",
    },
    {
      release: "release/jenna-raine-you-can-blame-me",
      discNumber: 1,
      position: 1,
      externalId: "0lgnrhSkigm3aMyaEg6sMN",
      externalLink: "https://open.spotify.com/track/0lgnrhSkigm3aMyaEg6sMN",
    },
  ],
} as const satisfies Track
