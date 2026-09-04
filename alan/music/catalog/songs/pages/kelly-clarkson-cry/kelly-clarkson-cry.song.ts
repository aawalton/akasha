import type { Song } from "../../song.page-type.ts"

export const kellyClarksonCry = {
  id: "019ea4b0-6b84-77aa-bc73-4d1068b75e00",
  pageTypeSlug: "song",
  slug: "kelly-clarkson-cry",
  title: "Cry",
  artistSlug: "kelly-clarkson",
  externalId: "d357de82-7e7d-3d59-9608-a8cea2559121",
  externalLink: "https://musicbrainz.org/work/d357de82-7e7d-3d59-9608-a8cea2559121",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
