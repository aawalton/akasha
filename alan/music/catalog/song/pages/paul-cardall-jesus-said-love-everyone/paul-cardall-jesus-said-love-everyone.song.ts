import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallJesusSaidLoveEveryone = {
  id: "01a0b779-b8ba-7fbe-9725-9e1bf87cf0d7",
  type: "page-type/song",
  slug: "paul-cardall-jesus-said-love-everyone",
  title: "Jesus Said Love Everyone",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
