import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorFire = {
  id: "01a0b779-628f-7d65-a4ea-b3ee500cebdb",
  type: "page-type/song",
  slug: "james-taylor-fire",
  title: "Fire",
  artist: "artist/james-taylor",
  performed: true,
} as const satisfies Song
