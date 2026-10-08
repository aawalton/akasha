import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallMoonlightSonata = {
  id: "01a0b779-e7da-7f50-84ec-b06c10506889",
  type: "page-type/song",
  slug: "paul-cardall-moonlight-sonata",
  title: "Moonlight Sonata",
  artist: "artist/paul-cardall",
  performed: true,
  createdAt: "2026-09-19T02:23:34.874Z",
  updatedAt: "2026-09-19T02:26:42.000Z",
} as const satisfies Song
