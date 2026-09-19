import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayIaam = {
  id: "01a0ba5d-3897-7e90-bc8e-a3cd49be39f7",
  type: "page-type/song",
  slug: "coldplay-iaam",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "0bac4078-df10-4c0a-8bf4-80115e50cf64",
      externalLink: "https://musicbrainz.org/work/0bac4078-df10-4c0a-8bf4-80115e50cf64",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "iAAM",
  artist: "artist/coldplay",
  songType: "derivative",
  performed: true,
} as const satisfies Song
