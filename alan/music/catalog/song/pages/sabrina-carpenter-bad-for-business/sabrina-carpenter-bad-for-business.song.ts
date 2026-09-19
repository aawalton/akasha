import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const sabrinaCarpenterBadForBusiness = {
  id: "01a0b723-cdb7-70f2-8b16-f1bd06352219",
  type: "page-type/song",
  slug: "sabrina-carpenter-bad-for-business",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "d8073c0b-5186-43e7-8624-dcdf0a17008d",
      externalLink: "https://musicbrainz.org/work/d8073c0b-5186-43e7-8624-dcdf0a17008d",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Bad for Business",
  artist: "artist/sabrina-carpenter",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
