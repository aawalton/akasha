import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const rockapellaLittleMarySnowflake = {
  id: "01a0d52b-52d9-7565-a466-1d4f4c1c7486",
  type: "page-type/song",
  slug: "rockapella-little-mary-snowflake",
  title: "Little Mary Snowflake",
  artist: "artist/rockapella",
  performed: true,
} as const satisfies Song
