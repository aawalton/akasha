import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const zaraLarssonSheDidItAgain = {
  id: "01a0b783-fc9f-7322-9aaf-9f3014fe5d24",
  type: "page-type/song",
  slug: "zara-larsson-she-did-it-again",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "30698d15-f086-44c1-be51-b8a6d5791b8d",
      externalLink: "https://musicbrainz.org/work/30698d15-f086-44c1-be51-b8a6d5791b8d",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "SHE DID IT AGAIN",
  artist: "artist/zara-larsson",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
