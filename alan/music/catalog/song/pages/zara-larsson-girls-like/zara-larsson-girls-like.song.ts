import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const zaraLarssonGirlsLike = {
  id: "019ea49f-7019-7cf7-bb1f-08214714c95f",
  type: "page-type/song",
  slug: "zara-larsson-girls-like",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "4eaa31cf-6c8b-4b39-8df5-5a967a35a02a",
      externalLink: "https://musicbrainz.org/work/4eaa31cf-6c8b-4b39-8df5-5a967a35a02a",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Girls Like",
  artist: "artist/zara-larsson",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
