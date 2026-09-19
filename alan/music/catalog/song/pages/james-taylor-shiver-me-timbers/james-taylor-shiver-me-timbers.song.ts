import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorShiverMeTimbers = {
  id: "01a0b779-7620-7fbf-b086-f14306b4c945",
  type: "page-type/song",
  slug: "james-taylor-shiver-me-timbers",
  title: "Shiver Me Timbers",
  artist: "artist/james-taylor",
  performed: true,
} as const satisfies Song
