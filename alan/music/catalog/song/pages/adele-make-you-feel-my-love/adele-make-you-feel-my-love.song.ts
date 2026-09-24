import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const adeleMakeYouFeelMyLove = {
  id: "01a0d52b-c259-7de8-8f81-c40700ec1196",
  type: "page-type/song",
  slug: "adele-make-you-feel-my-love",
  title: "Make You Feel My Love",
  artist: "artist/adele",
  performed: true,
} as const satisfies Song
