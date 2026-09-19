import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallBeStillMySoul = {
  id: "01a0b779-9c63-7e32-92f9-48e6757de8f8",
  type: "page-type/song",
  slug: "paul-cardall-be-still-my-soul",
  title: "Be Still, My Soul",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
