import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const rockapellaBangHardTime = {
  id: "01a0d52b-52db-744b-b3a9-822d99b970db",
  type: "page-type/track",
  slug: "rockapella-bang-hard-time",
  ownLength: 2.9145833333333333,
  ownProgress: 2.9145833333333333,
  partOfCollections: ["release/rockapella-bang"],
  status: "completed",
  unit: "unit/minutes",
  title: "Hard Time",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/rockapella" }],
  trackKey: "hardtime|1AFSUleuDTapVhm5zUf4ix|174875",
  song: "song/rockapella-hard-time",
  carriedBy: [
    {
      release: "release/rockapella-bang",
      discNumber: 1,
      position: 2,
      externalId: "61tNDXV0dq7T2ZcngRQhuq",
      externalLink: "https://open.spotify.com/track/61tNDXV0dq7T2ZcngRQhuq",
    },
  ],
} as const satisfies Track
