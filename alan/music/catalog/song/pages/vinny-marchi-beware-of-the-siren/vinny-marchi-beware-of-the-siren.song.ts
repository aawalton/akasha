import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const vinnyMarchiBewareOfTheSiren = {
  id: "01a0b783-884b-7838-8e08-fd971bab814b",
  type: "page-type/song",
  slug: "vinny-marchi-beware-of-the-siren",
  title: "Beware of the Siren",
  artist: "artist/vinny-marchi",
  performed: true,
} as const satisfies Song
