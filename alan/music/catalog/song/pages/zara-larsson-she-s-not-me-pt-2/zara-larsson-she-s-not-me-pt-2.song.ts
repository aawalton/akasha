import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const zaraLarssonSheSNotMePt2 = {
  id: "019ea4a0-eb30-7151-a218-0f26a8edabd1",
  type: "page-type/song",
  slug: "zara-larsson-she-s-not-me-pt-2",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "af6e6540-356b-4b88-bd6c-4fa271612c89",
      externalLink: "https://musicbrainz.org/work/af6e6540-356b-4b88-bd6c-4fa271612c89",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "She's Not Me, Pt. 2",
  artist: "artist/zara-larsson",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
