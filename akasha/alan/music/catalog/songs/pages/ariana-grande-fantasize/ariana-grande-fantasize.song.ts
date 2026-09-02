import type { Song } from "../../song.page-type.ts"

export const arianaGrandeFantasize = {
  id: "019ea4e3-7273-7ae8-8ea6-7e1bd002fb3b",
  pageTypeSlug: "song",
  slug: "ariana-grande-fantasize",
  title: "Fantasize",
  artistSlug: "ariana-grande",
  externalId: "dd7e2ca0-0ff0-4ec6-8dcc-613358a458cf",
  externalLink: "https://musicbrainz.org/work/dd7e2ca0-0ff0-4ec6-8dcc-613358a458cf",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
