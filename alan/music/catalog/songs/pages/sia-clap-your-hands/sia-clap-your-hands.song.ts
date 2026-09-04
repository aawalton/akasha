import type { Song } from "../../song.page-type.ts"

export const siaClapYourHands = {
  id: "019ea4c3-ef7a-79d6-90d0-15a72c903557",
  pageTypeSlug: "song",
  slug: "sia-clap-your-hands",
  title: "Clap Your Hands",
  artistSlug: "sia",
  externalId: "5b1d992b-0ddd-41cf-adb0-355046a12086",
  externalLink: "https://musicbrainz.org/work/5b1d992b-0ddd-41cf-adb0-355046a12086",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
