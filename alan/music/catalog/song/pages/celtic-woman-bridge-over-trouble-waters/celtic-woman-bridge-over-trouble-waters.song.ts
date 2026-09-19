import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const celticWomanBridgeOverTroubleWaters = {
  id: "01a0b779-31fc-7dc9-9863-2fd5edc08b6d",
  type: "page-type/song",
  slug: "celtic-woman-bridge-over-trouble-waters",
  title: "Bridge over Trouble Waters",
  artist: "artist/celtic-woman",
  performed: true,
} as const satisfies Song
