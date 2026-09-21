import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const emeiRabbithole = {
  id: "01a0c43e-7788-7635-ad07-e422b107b139",
  type: "page-type/song",
  slug: "emei-rabbithole",
  title: "RABBITHOLE",
  artist: "artist/emei",
  performed: true,
} as const satisfies Song
