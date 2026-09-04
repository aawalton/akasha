import type { Song } from "../../song.page-type.ts"

export const kellyClarksonYouForChristmas = {
  id: "019ea4b1-6efc-73c0-9774-a2a70144ebb1",
  pageTypeSlug: "song",
  slug: "kelly-clarkson-you-for-christmas",
  title: "You for Christmas",
  artistSlug: "kelly-clarkson",
  externalId: "157b92be-a81c-4b06-a544-1b4cf42b11d5",
  externalLink: "https://musicbrainz.org/work/157b92be-a81c-4b06-a544-1b4cf42b11d5",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
