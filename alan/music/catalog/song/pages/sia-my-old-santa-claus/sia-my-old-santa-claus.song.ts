import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaMyOldSantaClaus = {
  id: "019ea4c8-ef19-7197-a53e-4965be51a5a8",
  type: "page-type/song",
  slug: "sia-my-old-santa-claus",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "8afebdd0-cb7d-495b-af49-54f0cabd09ac",
      externalLink: "https://musicbrainz.org/work/8afebdd0-cb7d-495b-af49-54f0cabd09ac",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "My Old Santa Claus",
  artist: "artist/sia",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
