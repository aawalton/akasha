import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallVoices = {
  id: "01a0b77d-b30a-7536-b649-4417ce3b8578",
  type: "page-type/song",
  slug: "paul-cardall-voices",
  title: "Voices",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
