import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const alexandria1236 = {
  id: "01a0b726-8ce0-7550-bb60-12548405d5ec",
  type: "page-type/song",
  slug: "alexandria-1-2-3-6",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "8013bdd3-9ef2-4c32-b926-6a2d6a6b4d69",
      externalLink: "https://musicbrainz.org/recording/8013bdd3-9ef2-4c32-b926-6a2d6a6b4d69",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "1,2,3,6",
  artist: "artist/alexandria",
  songType: "original",
  performed: true,
} as const satisfies Song
