import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayWhiteShadows = {
  id: "01a0ba60-ff92-78eb-9fa1-33f6b6051594",
  type: "page-type/song",
  slug: "coldplay-white-shadows",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "afcdfd94-e74b-37d0-a0c1-4d4353a5f6be",
      externalLink: "https://musicbrainz.org/work/afcdfd94-e74b-37d0-a0c1-4d4353a5f6be",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "White Shadows",
  artist: "artist/coldplay",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
