import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const rockapellaComfortJoySnowstar = {
  id: "01a0d52b-52dc-7b8a-b239-ec9ba31538d9",
  type: "page-type/track",
  slug: "rockapella-comfort-joy-snowstar",
  ownLength: 3.024783333333333,
  ownProgress: 0,
  partOfCollections: ["release/rockapella-comfort-joy"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Snowstar",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/rockapella" }],
  trackKey: "snowstar|1AFSUleuDTapVhm5zUf4ix|181487",
  song: "song/rockapella-snowstar",
  carriedBy: [
    {
      release: "release/rockapella-comfort-joy",
      discNumber: 1,
      position: 10,
      externalId: "1Gt3J9E4knhWjKq1PxjCry",
      externalLink: "https://open.spotify.com/track/1Gt3J9E4knhWjKq1PxjCry",
    },
  ],
} as const satisfies Track
