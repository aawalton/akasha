import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const zaraLarssonHotSexy = {
  id: "019ea4a1-f722-749d-8ef5-e4eb769f0cfb",
  type: "page-type/song",
  slug: "zara-larsson-hot-sexy",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "f037c45d-7733-4d6a-92ce-dbf45598e8bd",
      externalLink: "https://musicbrainz.org/work/f037c45d-7733-4d6a-92ce-dbf45598e8bd",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "HOT & SEXY",
  artist: "artist/zara-larsson",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
