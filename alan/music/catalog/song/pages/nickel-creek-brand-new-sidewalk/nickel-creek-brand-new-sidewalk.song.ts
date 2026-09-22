import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const nickelCreekBrandNewSidewalk = {
  id: "01a0caa8-ba72-7f61-89b8-53efcb1bef85",
  type: "page-type/song",
  slug: "nickel-creek-brand-new-sidewalk",
  title: "Brand New Sidewalk",
  artist: "artist/nickel-creek",
  performed: true,
} as const satisfies Song
