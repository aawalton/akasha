import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jennaRaineHitchHiking = {
  id: "01a0c621-1ab4-7cb7-a465-dc40c821b785",
  type: "page-type/song",
  slug: "jenna-raine-hitch-hiking",
  title: "Hitch Hiking",
  artist: "artist/jenna-raine",
  performed: true,
} as const satisfies Song
