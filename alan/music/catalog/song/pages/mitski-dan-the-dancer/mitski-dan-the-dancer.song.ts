import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const mitskiDanTheDancer = {
  id: "019f0ea7-ef8d-7214-8ca0-bcbccf136756",
  type: "page-type/song",
  slug: "mitski-dan-the-dancer",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "e9e78e2d-e652-48d4-a387-3f3c96fea6e5",
      externalLink: "https://musicbrainz.org/work/e9e78e2d-e652-48d4-a387-3f3c96fea6e5",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Dan the Dancer",
  artist: "artist/mitski",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
