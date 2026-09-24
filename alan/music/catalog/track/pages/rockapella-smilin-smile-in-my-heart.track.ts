import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const rockapellaSmilinSmileInMyHeart = {
  id: "01a0d52b-52df-776a-a312-8e6d7a1a2e41",
  type: "page-type/track",
  slug: "rockapella-smilin-smile-in-my-heart",
  ownLength: 3.4582166666666665,
  ownProgress: 3.4582166666666665,
  partOfCollections: ["release/rockapella-smilin"],
  status: "completed",
  unit: "unit/minutes",
  title: "Smile in My Heart",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/rockapella" }],
  trackKey: "smileinmyheart|1AFSUleuDTapVhm5zUf4ix|207493",
  song: "song/rockapella-smile-in-my-heart",
  carriedBy: [
    {
      release: "release/rockapella-smilin",
      discNumber: 1,
      position: 7,
      externalId: "4xtsPg9qQKCKXV0PYAmDpM",
      externalLink: "https://open.spotify.com/track/4xtsPg9qQKCKXV0PYAmDpM",
    },
  ],
} as const satisfies Track
