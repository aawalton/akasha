import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const zaraLarssonEndOfTime = {
  id: "019ea4a0-daf0-786e-80eb-00b0b3504b7a",
  type: "page-type/song",
  slug: "zara-larsson-end-of-time",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "abf8eb9a-492a-4fa7-9aa8-ad95a0da9860",
      externalLink: "https://musicbrainz.org/work/abf8eb9a-492a-4fa7-9aa8-ad95a0da9860",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "End of Time",
  artist: "artist/zara-larsson",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
