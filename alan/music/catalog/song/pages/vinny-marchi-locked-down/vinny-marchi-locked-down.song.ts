import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const vinnyMarchiLockedDown = {
  id: "01a0b783-b47d-725c-8ea9-d0f2cd5d4fbf",
  type: "page-type/song",
  slug: "vinny-marchi-locked-down",
  title: "LOCKED DOWN",
  artist: "artist/vinny-marchi",
  performed: true,
} as const satisfies Song
