import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const rockapellaComfortJoyItsASmallWorld = {
  id: "01a0d52b-52dc-7b56-b7c4-c1b2b932fc71",
  type: "page-type/track",
  slug: "rockapella-comfort-joy-its-a-small-world",
  ownLength: 3.523233333333333,
  ownProgress: 0,
  partOfCollections: ["release/rockapella-comfort-joy"],
  status: "not-started",
  unit: "unit/minutes",
  title: "It's a Small World",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/rockapella" }],
  trackKey: "itsasmallworld|1AFSUleuDTapVhm5zUf4ix|211394",
  song: "song/rockapella-its-a-small-world",
  carriedBy: [
    {
      release: "release/rockapella-comfort-joy",
      discNumber: 1,
      position: 12,
      externalId: "65iZzgZU5YTk21CaiSGyBb",
      externalLink: "https://open.spotify.com/track/65iZzgZU5YTk21CaiSGyBb",
    },
  ],
} as const satisfies Track
