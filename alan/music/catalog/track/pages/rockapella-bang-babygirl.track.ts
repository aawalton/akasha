import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const rockapellaBangBabygirl = {
  id: "01a0d52b-52db-7c91-bac4-e26b21f00c1e",
  type: "page-type/track",
  slug: "rockapella-bang-babygirl",
  ownLength: 4.056816666666666,
  ownProgress: 0,
  partOfCollections: ["release/rockapella-bang"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Babygirl",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/rockapella" }],
  trackKey: "babygirl|1AFSUleuDTapVhm5zUf4ix|243409",
  song: "song/rockapella-babygirl",
  carriedBy: [
    {
      release: "release/rockapella-bang",
      discNumber: 1,
      position: 11,
      externalId: "3vpm4bv2G5VohoZU7gQQkm",
      externalLink: "https://open.spotify.com/track/3vpm4bv2G5VohoZU7gQQkm",
    },
  ],
} as const satisfies Track
