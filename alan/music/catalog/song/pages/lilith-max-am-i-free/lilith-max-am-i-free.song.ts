import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const lilithMaxAmIFree = {
  id: "019ea4f5-41fb-798c-8cac-3524694ba3aa",
  type: "page-type/song",
  slug: "lilith-max-am-i-free",
  title: "Am I Free",
  artist: "artist/lilith-max",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "c5e56a98-97a8-4982-9f6b-c3c3d7a0a279",
      externalLink: "https://musicbrainz.org/recording/c5e56a98-97a8-4982-9f6b-c3c3d7a0a279",
      lastSyncedAt: "2026-06-08",
    },
  ],
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-08T01:59:57.179Z",
  updatedAt: "2026-09-19T18:27:18.000Z",
} as const satisfies Song
