import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorLimousineDriver = {
  id: "01a0b779-7cb5-788b-8e2d-ede6e056ac8d",
  type: "page-type/song",
  slug: "james-taylor-limousine-driver",
  title: "Limousine Driver",
  artist: "artist/james-taylor",
  performed: true,
} as const satisfies Song
