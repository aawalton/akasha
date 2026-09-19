import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayMaMeilleureEnnemie = {
  id: "01a0ba60-fb4d-794c-9f7f-5df18af69729",
  type: "page-type/song",
  slug: "coldplay-ma-meilleure-ennemie",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "d26ac9f5-f04a-4e81-b76b-1096b8cb904a",
      externalLink: "https://musicbrainz.org/work/d26ac9f5-f04a-4e81-b76b-1096b8cb904a",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Ma meilleure ennemie",
  artist: "artist/coldplay",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
