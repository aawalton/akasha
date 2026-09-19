import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorTurnAway = {
  id: "01a0b779-80a6-76d9-afc8-8f6f80f90c1e",
  type: "page-type/song",
  slug: "james-taylor-turn-away",
  title: "Turn Away",
  artist: "artist/james-taylor",
  performed: true,
} as const satisfies Song
