import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const rockapellaBangMalibuGrandPrix = {
  id: "01a0d52b-52db-7691-a272-f8fb8df9b99f",
  type: "page-type/track",
  slug: "rockapella-bang-malibu-grand-prix",
  ownLength: 3.7138166666666668,
  ownProgress: 0,
  partOfCollections: ["release/rockapella-bang"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Malibu Grand Prix",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/rockapella" }],
  trackKey: "malibugrandprix|1AFSUleuDTapVhm5zUf4ix|222829",
  song: "song/rockapella-malibu-grand-prix",
  carriedBy: [
    {
      release: "release/rockapella-bang",
      discNumber: 1,
      position: 9,
      externalId: "1Jm5MTAtcgwVTR5TVDVb1r",
      externalLink: "https://open.spotify.com/track/1Jm5MTAtcgwVTR5TVDVb1r",
    },
  ],
} as const satisfies Track
