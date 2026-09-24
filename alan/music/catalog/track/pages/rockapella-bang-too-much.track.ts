import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const rockapellaBangTooMuch = {
  id: "01a0d52b-52db-7444-b291-366d1008c3a7",
  type: "page-type/track",
  slug: "rockapella-bang-too-much",
  ownLength: 3.5955666666666666,
  ownProgress: 3.5955666666666666,
  partOfCollections: ["release/rockapella-bang"],
  status: "completed",
  unit: "unit/minutes",
  title: "Too Much",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/rockapella" }],
  trackKey: "toomuch|1AFSUleuDTapVhm5zUf4ix|215734",
  song: "song/rockapella-too-much",
  carriedBy: [
    {
      release: "release/rockapella-bang",
      discNumber: 1,
      position: 10,
      externalId: "1OoidCE0mWWTKEXRZmjhpW",
      externalLink: "https://open.spotify.com/track/1OoidCE0mWWTKEXRZmjhpW",
    },
  ],
} as const satisfies Track
