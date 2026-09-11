import type { Song } from "akasha/alan/music/catalog/songs/song.page-type.types.ts"

export const auroraWinterBird = {
  id: "019ea4a5-ea1c-7395-96a4-ee3415f070c2",
  type: "song",
  slug: "aurora-winter-bird",
  title: "Winter Bird",
  artist: "aurora",
  externalId: "78427908-793f-48d3-9874-b1baff6213d0",
  externalLink: "https://musicbrainz.org/work/78427908-793f-48d3-9874-b1baff6213d0",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
