import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayStayinAlive = {
  id: "01a0ba5d-52ce-7a59-9ee8-a4d6937623b7",
  type: "page-type/song",
  slug: "coldplay-stayin-alive",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "6113d16a-8d2e-3e54-adc2-bacaeb0058be",
      externalLink: "https://musicbrainz.org/work/6113d16a-8d2e-3e54-adc2-bacaeb0058be",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Stayin’ Alive",
  artist: "artist/coldplay",
  performed: true,
} as const satisfies Song
