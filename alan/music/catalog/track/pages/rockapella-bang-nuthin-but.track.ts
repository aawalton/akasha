import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const rockapellaBangNuthinBut = {
  id: "01a0d52b-52db-7b7a-8fdf-8013b28fa4e8",
  type: "page-type/track",
  slug: "rockapella-bang-nuthin-but",
  ownLength: 3.7852333333333332,
  ownProgress: 0,
  partOfCollections: ["release/rockapella-bang"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Nuthin' But",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/rockapella" }],
  trackKey: "nuthinbut|1AFSUleuDTapVhm5zUf4ix|227114",
  song: "song/rockapella-nuthin-but",
  carriedBy: [
    {
      release: "release/rockapella-bang",
      discNumber: 1,
      position: 5,
      externalId: "5wQ5eWUGciYaChWo8e48to",
      externalLink: "https://open.spotify.com/track/5wQ5eWUGciYaChWo8e48to",
    },
  ],
} as const satisfies Track
