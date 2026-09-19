import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysPreludeMyLittleGirl = {
  id: "01a0b783-7e8c-7b34-83ca-6774f7d4245c",
  type: "page-type/song",
  slug: "the-piano-guys-prelude-my-little-girl",
  title: "Prelude (My Little Girl)",
  artist: "artist/the-piano-guys",
  performed: true,
} as const satisfies Song
