import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayLhuna = {
  id: "01a0ba5d-4bc9-79b1-a96d-fc06b0e5fb65",
  type: "page-type/song",
  slug: "coldplay-lhuna",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "0c5060d1-693b-49c9-87db-d989e8b6c801",
      externalLink: "https://musicbrainz.org/work/0c5060d1-693b-49c9-87db-d989e8b6c801",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Lhuna",
  artist: "artist/coldplay",
  performed: true,
} as const satisfies Song
