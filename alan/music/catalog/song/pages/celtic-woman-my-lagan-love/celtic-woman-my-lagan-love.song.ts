import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const celticWomanMyLaganLove = {
  id: "01a0b771-7913-7d76-a291-e03c237eeb8d",
  type: "page-type/song",
  slug: "celtic-woman-my-lagan-love",
  title: "My Lagan Love",
  artist: "artist/celtic-woman",
  performed: true,
} as const satisfies Song
