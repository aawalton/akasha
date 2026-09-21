import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jennaRaineRoses = {
  id: "01a0c621-1a23-7e82-b675-24d190175bff",
  type: "page-type/song",
  slug: "jenna-raine-roses",
  title: "Roses",
  artist: "artist/jenna-raine",
  performed: true,
} as const satisfies Song
