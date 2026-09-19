import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const celticWomanHarkTheHeraldAngelsSing = {
  id: "01a0b771-9dfc-7f44-903c-c7a4e895cf44",
  type: "page-type/song",
  slug: "celtic-woman-hark-the-herald-angels-sing",
  title: "Hark The Herald Angels Sing",
  artist: "artist/celtic-woman",
  performed: true,
} as const satisfies Song
