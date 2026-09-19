import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorAsEasyAsRollingOffALog = {
  id: "01a0b779-53b9-7443-b642-bbf7dc80300d",
  type: "page-type/song",
  slug: "james-taylor-as-easy-as-rolling-off-a-log",
  title: "As Easy As Rolling Off A Log",
  artist: "artist/james-taylor",
  performed: true,
} as const satisfies Song
