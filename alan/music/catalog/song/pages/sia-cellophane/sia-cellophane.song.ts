import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaCellophane = {
  id: "019ea4c4-0eaf-7087-84e6-640106d66fe4",
  type: "page-type/song",
  slug: "sia-cellophane",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "6a15767c-fb23-4710-adb3-806796f2f42d",
      externalLink: "https://musicbrainz.org/work/6a15767c-fb23-4710-adb3-806796f2f42d",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Cellophane",
  artist: "artist/sia",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-08T01:06:12.783Z",
  updatedAt: "2026-09-19T18:27:41.000Z",
} as const satisfies Song
