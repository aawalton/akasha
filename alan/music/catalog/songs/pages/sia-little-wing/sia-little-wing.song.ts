import type { Song } from "../../song.page-type.ts"

export const siaLittleWing = {
  id: "019ea4c7-469f-73a3-a2b1-919bffcdc463",
  pageTypeSlug: "song",
  slug: "sia-little-wing",
  title: "Little Wing",
  artistSlug: "sia",
  externalId: "361cae0a-6a36-48ad-8052-f36729f188c5",
  externalLink: "https://musicbrainz.org/work/361cae0a-6a36-48ad-8052-f36729f188c5",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
