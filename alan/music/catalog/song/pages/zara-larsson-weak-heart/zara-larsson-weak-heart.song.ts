import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const zaraLarssonWeakHeart = {
  id: "019ea4a1-82b3-714f-aa76-3cefe9abb810",
  type: "page-type/song",
  slug: "zara-larsson-weak-heart",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "c86c8839-f25f-462a-85ff-79368f0668d1",
      externalLink: "https://musicbrainz.org/work/c86c8839-f25f-462a-85ff-79368f0668d1",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Weak Heart",
  artist: "artist/zara-larsson",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
