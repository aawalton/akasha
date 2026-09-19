import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const celticWomanLetItSnow = {
  id: "01a0b771-37f7-7e9a-9f9e-e343b89f70b8",
  type: "page-type/song",
  slug: "celtic-woman-let-it-snow",
  title: "Let It Snow",
  artist: "artist/celtic-woman",
  performed: true,
} as const satisfies Song
