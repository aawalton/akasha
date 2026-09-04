import type { Song } from "../../song.page-type.ts"

export const lilithMaxSisyphus = {
  id: "019ea4f6-4f61-7e01-8fcc-a766a46fe9bc",
  pageTypeSlug: "song",
  slug: "lilith-max-sisyphus",
  title: "Sisyphus",
  artistSlug: "lilith-max",
  externalId: "8cd916e7-e439-4e1b-9f38-c990750822e5",
  externalLink: "https://musicbrainz.org/recording/8cd916e7-e439-4e1b-9f38-c990750822e5",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
