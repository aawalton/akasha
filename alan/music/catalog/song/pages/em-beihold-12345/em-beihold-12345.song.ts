import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const emBeihold12345 = {
  id: "019ea4df-d226-7bd3-8eeb-1c048d326b14",
  type: "page-type/song",
  slug: "em-beihold-12345",
  title: "12345",
  artist: "artist/em-beihold",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "f8c3d47e-e8a0-465b-8483-4f9702effda2",
      externalLink: "https://musicbrainz.org/work/f8c3d47e-e8a0-465b-8483-4f9702effda2",
      lastSyncedAt: "2026-06-08",
    },
  ],
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
