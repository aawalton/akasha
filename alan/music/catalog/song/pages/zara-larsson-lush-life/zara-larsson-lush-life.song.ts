import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const zaraLarssonLushLife = {
  id: "019ea4a1-c1c5-7489-bd76-2bf82d231446",
  type: "page-type/song",
  slug: "zara-larsson-lush-life",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "d751430d-da3a-4b33-b867-64380ac3e249",
      externalLink: "https://musicbrainz.org/work/d751430d-da3a-4b33-b867-64380ac3e249",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Lush Life",
  artist: "artist/zara-larsson",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
