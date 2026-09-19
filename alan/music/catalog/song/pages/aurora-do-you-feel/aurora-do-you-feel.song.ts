import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const auroraDoYouFeel = {
  id: "01a0b770-e78f-7590-bb4a-8ee6dc02ecdc",
  type: "page-type/song",
  slug: "aurora-do-you-feel",
  title: "Do You Feel?",
  artist: "artist/aurora",
  performed: true,
} as const satisfies Song
