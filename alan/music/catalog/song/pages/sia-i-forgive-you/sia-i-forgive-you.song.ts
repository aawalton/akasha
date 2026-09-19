import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaIForgiveYou = {
  id: "019ea4c9-935c-743f-acf2-2b4ac958c488",
  type: "page-type/song",
  slug: "sia-i-forgive-you",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "ae3405a2-8dcb-4fb5-b7f8-2be993ac32e9",
      externalLink: "https://musicbrainz.org/work/ae3405a2-8dcb-4fb5-b7f8-2be993ac32e9",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "I Forgive You",
  artist: "artist/sia",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
