import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const rockapella2IsItInYou = {
  id: "01a0d52b-52da-79db-8e34-c83457009491",
  type: "page-type/track",
  slug: "rockapella-2-is-it-in-you",
  ownLength: 3.2647166666666667,
  ownProgress: 0,
  partOfCollections: ["release/rockapella-2"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Is It in You?",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/rockapella" }],
  trackKey: "isitinyou|1AFSUleuDTapVhm5zUf4ix|195883",
  song: "song/rockapella-is-it-in-you",
  carriedBy: [
    {
      release: "release/rockapella-2",
      discNumber: 1,
      position: 5,
      externalId: "1ekQ8P0rGMRgfDqRnnt42J",
      externalLink: "https://open.spotify.com/track/1ekQ8P0rGMRgfDqRnnt42J",
    },
  ],
} as const satisfies Track
