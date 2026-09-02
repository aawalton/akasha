import type { Song } from "../../song.page-type.ts"

export const kellyClarksonAddicted = {
  id: "019ea4b0-b44d-773c-be50-8de4f0bfdf0f",
  pageTypeSlug: "song",
  slug: "kelly-clarkson-addicted",
  title: "Addicted",
  artistSlug: "kelly-clarkson",
  externalId: "dc238800-3b08-3ffe-a00f-6f6e50229225",
  externalLink: "https://musicbrainz.org/work/dc238800-3b08-3ffe-a00f-6f6e50229225",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
