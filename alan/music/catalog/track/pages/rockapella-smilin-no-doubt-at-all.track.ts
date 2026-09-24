import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const rockapellaSmilinNoDoubtAtAll = {
  id: "01a0d52b-52df-7cf3-9892-383117ecfa88",
  type: "page-type/track",
  slug: "rockapella-smilin-no-doubt-at-all",
  ownLength: 2.7089833333333333,
  ownProgress: 0,
  partOfCollections: ["release/rockapella-smilin"],
  status: "not-started",
  unit: "unit/minutes",
  title: "No Doubt at All",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/rockapella" }],
  trackKey: "nodoubtatall|1AFSUleuDTapVhm5zUf4ix|162539",
  song: "song/rockapella-no-doubt-at-all",
  carriedBy: [
    {
      release: "release/rockapella-smilin",
      discNumber: 1,
      position: 9,
      externalId: "00d0QcbdBrWbFl5cRUVGtw",
      externalLink: "https://open.spotify.com/track/00d0QcbdBrWbFl5cRUVGtw",
    },
  ],
} as const satisfies Track
