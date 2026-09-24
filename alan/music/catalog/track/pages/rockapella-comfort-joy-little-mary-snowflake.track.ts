import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const rockapellaComfortJoyLittleMarySnowflake = {
  id: "01a0d52b-52dc-77e5-8788-1de574148356",
  type: "page-type/track",
  slug: "rockapella-comfort-joy-little-mary-snowflake",
  ownLength: 3.0572833333333334,
  ownProgress: 0,
  partOfCollections: ["release/rockapella-comfort-joy"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Little Mary Snowflake",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/rockapella" }],
  trackKey: "littlemarysnowflake|1AFSUleuDTapVhm5zUf4ix|183437",
  song: "song/rockapella-little-mary-snowflake",
  carriedBy: [
    {
      release: "release/rockapella-comfort-joy",
      discNumber: 1,
      position: 1,
      externalId: "5PdVeOecKnzbWDUW8k85Wk",
      externalLink: "https://open.spotify.com/track/5PdVeOecKnzbWDUW8k85Wk",
    },
  ],
} as const satisfies Track
