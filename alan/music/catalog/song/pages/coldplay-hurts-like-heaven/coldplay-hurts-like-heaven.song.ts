import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayHurtsLikeHeaven = {
  id: "01a0ba5d-3a26-719c-8ab7-c91ad9e893f5",
  type: "page-type/song",
  slug: "coldplay-hurts-like-heaven",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "1c735e22-30d1-439e-a7b8-9280ee6ada06",
      externalLink: "https://musicbrainz.org/work/1c735e22-30d1-439e-a7b8-9280ee6ada06",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Hurts Like Heaven",
  artist: "artist/coldplay",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
