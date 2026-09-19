import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaKillAndRun = {
  id: "019ea4c9-09a2-771a-b8bd-0692735cf9ae",
  type: "page-type/song",
  slug: "sia-kill-and-run",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "8d095a0d-d32a-4e81-bcec-58525d389428",
      externalLink: "https://musicbrainz.org/work/8d095a0d-d32a-4e81-bcec-58525d389428",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Kill and Run",
  artist: "artist/sia",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
