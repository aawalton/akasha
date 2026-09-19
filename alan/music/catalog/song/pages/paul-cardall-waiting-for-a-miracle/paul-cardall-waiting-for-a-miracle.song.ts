import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallWaitingForAMiracle = {
  id: "01a0b77e-60d7-7d6c-9cc3-6aecbb6e49dc",
  type: "page-type/song",
  slug: "paul-cardall-waiting-for-a-miracle",
  title: "Waiting for a Miracle",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
