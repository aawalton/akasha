import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const rockapellaBang4u4now4life = {
  id: "01a0d52b-52db-7ca9-b875-827059881e76",
  type: "page-type/track",
  slug: "rockapella-bang-4u4now4life",
  ownLength: 2.9867666666666666,
  ownProgress: 0,
  partOfCollections: ["release/rockapella-bang"],
  status: "not-started",
  unit: "unit/minutes",
  title: "4u4now4life",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/rockapella" }],
  trackKey: "4u4now4life|1AFSUleuDTapVhm5zUf4ix|179206",
  song: "song/rockapella-4u4now4life",
  carriedBy: [
    {
      release: "release/rockapella-bang",
      discNumber: 1,
      position: 3,
      externalId: "2SAkSMCnyX0FvLRKsuNdjg",
      externalLink: "https://open.spotify.com/track/2SAkSMCnyX0FvLRKsuNdjg",
    },
  ],
} as const satisfies Track
