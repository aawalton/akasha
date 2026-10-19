import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const pentatonixInvincible = {
  id: "01a1546f-24ee-7f82-977f-31adc508ab93",
  type: "page-type/song",
  slug: "pentatonix-invincible",
  title: "Invincible",
  artist: "artist/pentatonix",
  performed: true,
  createdAt: "2026-10-19T13:52:12.521Z",
  updatedAt: "2026-10-19T13:52:12.521Z",
} as const satisfies Song
