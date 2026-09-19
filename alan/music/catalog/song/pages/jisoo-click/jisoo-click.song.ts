import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jisooClick = {
  id: "01a0b779-8f10-753d-b9a9-632fcd05160c",
  type: "page-type/song",
  slug: "jisoo-click",
  title: "CLICK",
  artist: "artist/jisoo",
  performed: true,
} as const satisfies Song
