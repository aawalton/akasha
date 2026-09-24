import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const rockapellaJamsVol1MoonRiverLive = {
  id: "01a0d52b-52dd-7359-b65c-3a30a229312b",
  type: "page-type/track",
  slug: "rockapella-jams-vol-1-moon-river-live",
  ownLength: 3.7343,
  ownProgress: 0,
  partOfCollections: ["release/rockapella-jams-vol-1"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Moon River (Live)",
  trackType: "live",
  explicit: false,
  trackArtist: [{ artist: "artist/rockapella" }],
  trackKey: "moonriverlive|1AFSUleuDTapVhm5zUf4ix|224058",
  song: "song/rockapella-moon-river",
  carriedBy: [
    {
      release: "release/rockapella-jams-vol-1",
      discNumber: 1,
      position: 18,
      externalId: "4EcVyWbbItWrfiz4pGDOYn",
      externalLink: "https://open.spotify.com/track/4EcVyWbbItWrfiz4pGDOYn",
    },
  ],
} as const satisfies Track
