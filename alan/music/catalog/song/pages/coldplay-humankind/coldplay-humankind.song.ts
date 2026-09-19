import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayHumankind = {
  id: "01a0ba5d-3b29-7702-977f-f20b7951f6fc",
  type: "page-type/song",
  slug: "coldplay-humankind",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "31440bb5-3e8e-4d1e-9fd4-9f54827d19ab",
      externalLink: "https://musicbrainz.org/work/31440bb5-3e8e-4d1e-9fd4-9f54827d19ab",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Humankind",
  artist: "artist/coldplay",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
