import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorWhoComesThisNight = {
  id: "01a0b779-8db0-78fa-9e81-2764cc8e3970",
  type: "page-type/song",
  slug: "james-taylor-who-comes-this-night",
  title: "Who Comes This Night",
  artist: "artist/james-taylor",
  performed: true,
} as const satisfies Song
