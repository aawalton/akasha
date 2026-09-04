import type { Song } from "../../song.page-type.ts"

export const kellyClarksonTightrope = {
  id: "019ea4b2-7525-76e9-8c14-f93095f3fa9d",
  pageTypeSlug: "song",
  slug: "kelly-clarkson-tightrope",
  title: "Tightrope",
  artistSlug: "kelly-clarkson",
  externalId: "6c3de7ea-e7e0-4d4f-9e3f-acdea69f5e62",
  externalLink: "https://musicbrainz.org/work/6c3de7ea-e7e0-4d4f-9e3f-acdea69f5e62",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
