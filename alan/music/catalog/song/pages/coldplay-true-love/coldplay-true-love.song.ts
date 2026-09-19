import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayTrueLove = {
  id: "01a0ba60-f96c-70db-b496-7feeb38b7efc",
  type: "page-type/song",
  slug: "coldplay-true-love",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "b3a2b3fa-97ac-4fb9-9b2d-46d061c6bd07",
      externalLink: "https://musicbrainz.org/work/b3a2b3fa-97ac-4fb9-9b2d-46d061c6bd07",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "True Love",
  artist: "artist/coldplay",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
