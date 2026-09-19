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
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
