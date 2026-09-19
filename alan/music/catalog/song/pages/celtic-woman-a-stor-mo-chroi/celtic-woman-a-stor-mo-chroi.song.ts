import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const celticWomanAStorMoChroi = {
  id: "01a0b720-1008-7662-8c11-16cc6f9d0fd4",
  type: "page-type/song",
  slug: "celtic-woman-a-stor-mo-chroi",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "88287e8c-d506-4cc2-97a4-fbd93b6ef629",
      externalLink: "https://musicbrainz.org/work/88287e8c-d506-4cc2-97a4-fbd93b6ef629",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "A Stór Mo Chroí",
  artist: "artist/celtic-woman",
  performed: true,
} as const satisfies Song
