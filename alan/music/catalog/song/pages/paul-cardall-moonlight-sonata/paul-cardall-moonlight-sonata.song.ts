import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallMoonlightSonata = {
  id: "01a0b779-e7da-7f50-84ec-b06c10506889",
  type: "page-type/song",
  slug: "paul-cardall-moonlight-sonata",
  title: "Moonlight Sonata",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
