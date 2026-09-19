import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const celticWomanSkyrimThemeDragonborn = {
  id: "01a0b771-913e-7ec6-96c5-1d765c4538fb",
  type: "page-type/song",
  slug: "celtic-woman-skyrim-theme-dragonborn",
  title: "Skyrim Theme (Dragonborn)",
  artist: "artist/celtic-woman",
  performed: true,
} as const satisfies Song
