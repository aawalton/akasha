import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysFightSongAmazingGrace = {
  id: "01a0b77f-fec4-728d-8ecb-31f21fd4100b",
  type: "page-type/song",
  slug: "the-piano-guys-fight-song-amazing-grace",
  title: "Fight Song / Amazing Grace",
  artist: "artist/the-piano-guys",
  performed: true,
} as const satisfies Song
