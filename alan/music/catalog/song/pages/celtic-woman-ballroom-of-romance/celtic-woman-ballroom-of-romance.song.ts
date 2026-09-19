import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const celticWomanBallroomOfRomance = {
  id: "01a0b771-4a19-74d7-acdf-47524e01f51c",
  type: "page-type/song",
  slug: "celtic-woman-ballroom-of-romance",
  title: "Ballroom Of Romance",
  artist: "artist/celtic-woman",
  performed: true,
} as const satisfies Song
