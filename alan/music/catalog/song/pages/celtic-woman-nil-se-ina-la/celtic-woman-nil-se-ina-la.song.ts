import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const celticWomanNilSeInaLa = {
  id: "01a0b720-1528-7d48-ad1f-014666043e47",
  type: "page-type/song",
  slug: "celtic-woman-nil-se-ina-la",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "e16ae110-d5c3-4353-843f-d33c174cc3e1",
      externalLink: "https://musicbrainz.org/work/e16ae110-d5c3-4353-843f-d33c174cc3e1",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Níl Sé ina Lá",
  artist: "artist/celtic-woman",
  performed: true,
} as const satisfies Song
