import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const rockapellaComfortJoyPeaceOnEarth = {
  id: "01a0d52b-52dc-7e0c-8112-4cfef6128519",
  type: "page-type/track",
  slug: "rockapella-comfort-joy-peace-on-earth",
  ownLength: 4.289466666666667,
  ownProgress: 0,
  partOfCollections: ["release/rockapella-comfort-joy"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Peace on Earth",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/rockapella" }],
  trackKey: "peaceonearth|1AFSUleuDTapVhm5zUf4ix|257368",
  song: "song/rockapella-peace-on-earth",
  carriedBy: [
    {
      release: "release/rockapella-comfort-joy",
      discNumber: 1,
      position: 11,
      externalId: "382xT0RQ3ozkUYxe8VpEFX",
      externalLink: "https://open.spotify.com/track/382xT0RQ3ozkUYxe8VpEFX",
    },
  ],
} as const satisfies Track
