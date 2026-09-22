import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const nickelCreekHangingByAThread = {
  id: "01a0caa8-b83f-7aa1-910a-60f466309035",
  type: "page-type/song",
  slug: "nickel-creek-hanging-by-a-thread",
  title: "Hanging By A Thread",
  artist: "artist/nickel-creek",
  performed: true,
} as const satisfies Song
