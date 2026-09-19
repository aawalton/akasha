import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const imagineDragonsIWish = {
  id: "019ea49a-ae07-7fc4-8451-c1c7880e7387",
  type: "page-type/song",
  slug: "imagine-dragons-i-wish",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "e067e0ce-14f8-4ff0-bb41-7df17b406746",
      externalLink: "https://musicbrainz.org/work/e067e0ce-14f8-4ff0-bb41-7df17b406746",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "I Wish",
  artist: "artist/imagine-dragons",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
