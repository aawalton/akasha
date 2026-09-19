import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const imagineDragonsFallen = {
  id: "019ea49b-1621-7c61-9f94-652421e00d11",
  type: "page-type/song",
  slug: "imagine-dragons-fallen",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "ee47ab27-7bea-4587-a902-60ff9ab6d626",
      externalLink: "https://musicbrainz.org/work/ee47ab27-7bea-4587-a902-60ff9ab6d626",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Fallen",
  artist: "artist/imagine-dragons",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
