import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const nickelCreekCuckoosNest = {
  id: "01a0caa8-b00b-7e8f-88e7-2b4abe934f64",
  type: "page-type/song",
  slug: "nickel-creek-cuckoos-nest",
  title: "Cuckoo's Nest",
  artist: "artist/nickel-creek",
  performed: true,
} as const satisfies Song
