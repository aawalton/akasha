import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysJurassicParkTheme = {
  id: "01a0b780-74c3-7ff9-b401-b9c0001dbc10",
  type: "page-type/song",
  slug: "the-piano-guys-jurassic-park-theme",
  title: "Jurassic Park Theme",
  artist: "artist/the-piano-guys",
  performed: true,
  createdAt: "2026-09-19T02:30:44.163Z",
  updatedAt: "2026-09-19T02:33:47.000Z",
} as const satisfies Song
