import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaWildOnes = {
  id: "019ea4cb-6891-7b3b-9d9f-e12e250c8088",
  type: "page-type/song",
  slug: "sia-wild-ones",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "2900b809-c5c4-4f99-884f-a60bd14c6cda",
      externalLink: "https://musicbrainz.org/work/2900b809-c5c4-4f99-884f-a60bd14c6cda",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Wild Ones",
  artist: "artist/sia",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
