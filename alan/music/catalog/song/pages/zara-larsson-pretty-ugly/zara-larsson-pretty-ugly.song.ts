import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const zaraLarssonPrettyUgly = {
  id: "019ea49e-7e6b-7332-a07f-5675fb93c53e",
  type: "page-type/song",
  slug: "zara-larsson-pretty-ugly",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "244e97ee-16b9-4d39-8c03-e32499867512",
      externalLink: "https://musicbrainz.org/work/244e97ee-16b9-4d39-8c03-e32499867512",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Pretty Ugly",
  artist: "artist/zara-larsson",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
