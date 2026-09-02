import type { Song } from "../../song.page-type.ts"

export const kellyClarksonAnytime = {
  id: "019ea4b0-25ee-7164-8713-7d1db6fdc10e",
  pageTypeSlug: "song",
  slug: "kelly-clarkson-anytime",
  title: "Anytime",
  artistSlug: "kelly-clarkson",
  externalId: "caa60276-88a7-4627-93f2-1adf9e95aeb2",
  externalLink: "https://musicbrainz.org/work/caa60276-88a7-4627-93f2-1adf9e95aeb2",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
