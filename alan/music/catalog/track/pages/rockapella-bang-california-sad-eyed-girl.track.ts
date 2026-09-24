import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const rockapellaBangCaliforniaSadEyedGirl = {
  id: "01a0d52b-52db-77da-b7a7-3b442b7b8420",
  type: "page-type/track",
  slug: "rockapella-bang-california-sad-eyed-girl",
  ownLength: 3.8564333333333334,
  ownProgress: 0,
  partOfCollections: ["release/rockapella-bang"],
  status: "not-started",
  unit: "unit/minutes",
  title: "California Sad-Eyed Girl",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/rockapella" }],
  trackKey: "californiasadeyedgirl|1AFSUleuDTapVhm5zUf4ix|231386",
  song: "song/rockapella-california-sad-eyed-girl",
  carriedBy: [
    {
      release: "release/rockapella-bang",
      discNumber: 1,
      position: 6,
      externalId: "5BRJqaWCLcFF75VwLBQh0M",
      externalLink: "https://open.spotify.com/track/5BRJqaWCLcFF75VwLBQh0M",
    },
  ],
} as const satisfies Track
