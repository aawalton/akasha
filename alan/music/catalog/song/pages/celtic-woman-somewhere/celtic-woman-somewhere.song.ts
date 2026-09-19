import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const celticWomanSomewhere = {
  id: "01a0b779-4413-751a-8bc6-191394ef5d7a",
  type: "page-type/song",
  slug: "celtic-woman-somewhere",
  title: "Somewhere",
  artist: "artist/celtic-woman",
  performed: true,
} as const satisfies Song
