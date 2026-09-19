import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysLetItSnowWinterWonderland = {
  id: "01a0b780-0e32-7470-a9bf-341173601a26",
  type: "page-type/song",
  slug: "the-piano-guys-let-it-snow-winter-wonderland",
  title: "Let It Snow / Winter Wonderland",
  artist: "artist/the-piano-guys",
  performed: true,
} as const satisfies Song
