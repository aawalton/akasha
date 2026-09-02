import type { Song } from "../../song.page-type.ts"

export const kellyClarksonGlow = {
  id: "019ea4b1-0e34-7372-a229-6383cd04f0bb",
  pageTypeSlug: "song",
  slug: "kelly-clarkson-glow",
  title: "Glow",
  artistSlug: "kelly-clarkson",
  externalId: "f58bc2e0-185c-456d-b7b4-eb00f7d6b071",
  externalLink: "https://musicbrainz.org/work/f58bc2e0-185c-456d-b7b4-eb00f7d6b071",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
