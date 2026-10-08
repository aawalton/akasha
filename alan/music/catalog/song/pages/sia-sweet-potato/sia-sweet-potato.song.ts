import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaSweetPotato = {
  id: "019ea4cd-9571-7198-8133-6e492baaf22c",
  type: "page-type/song",
  slug: "sia-sweet-potato",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "ac395888-99c7-4572-aa34-f3ca96a29f41",
      externalLink: "https://musicbrainz.org/work/ac395888-99c7-4572-aa34-f3ca96a29f41",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Sweet Potato",
  artist: "artist/sia",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-08T01:16:37.105Z",
  updatedAt: "2026-09-19T18:27:41.000Z",
} as const satisfies Song
