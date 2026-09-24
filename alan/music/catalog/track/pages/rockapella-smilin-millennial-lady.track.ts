import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const rockapellaSmilinMillennialLady = {
  id: "01a0d52b-52df-7c17-99c3-e72d38c66b46",
  type: "page-type/track",
  slug: "rockapella-smilin-millennial-lady",
  ownLength: 4.066583333333333,
  ownProgress: 4.066583333333333,
  partOfCollections: ["release/rockapella-smilin"],
  status: "completed",
  unit: "unit/minutes",
  title: "Millennial Lady",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/rockapella" }],
  trackKey: "millenniallady|1AFSUleuDTapVhm5zUf4ix|243995",
  song: "song/rockapella-millennial-lady",
  carriedBy: [
    {
      release: "release/rockapella-smilin",
      discNumber: 1,
      position: 10,
      externalId: "5suBuazNUzi4sZfBCUMITe",
      externalLink: "https://open.spotify.com/track/5suBuazNUzi4sZfBCUMITe",
    },
  ],
} as const satisfies Track
