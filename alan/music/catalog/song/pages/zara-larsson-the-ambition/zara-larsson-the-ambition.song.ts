import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const zaraLarssonTheAmbition = {
  id: "019ea4a0-3048-7353-86d8-eee7c23ccdd2",
  type: "page-type/song",
  slug: "zara-larsson-the-ambition",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "7db0fcea-f1a1-4fa0-aa1a-17c643f11b42",
      externalLink: "https://musicbrainz.org/work/7db0fcea-f1a1-4fa0-aa1a-17c643f11b42",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "The Ambition",
  artist: "artist/zara-larsson",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
