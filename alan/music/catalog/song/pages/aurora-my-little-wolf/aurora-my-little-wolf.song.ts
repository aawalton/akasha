import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const auroraMyLittleWolf = {
  id: "01a0b770-fe68-74b0-9675-24ab28007d9c",
  type: "page-type/song",
  slug: "aurora-my-little-wolf",
  title: "My Little Wolf",
  artist: "artist/aurora",
  performed: true,
} as const satisfies Song
