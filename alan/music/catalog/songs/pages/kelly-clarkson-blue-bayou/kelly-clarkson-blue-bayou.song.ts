import type { Song } from "../../song.page-type.ts"

export const kellyClarksonBlueBayou = {
  id: "019ea4ae-ce21-7fff-a71f-8018455d1495",
  pageTypeSlug: "song",
  slug: "kelly-clarkson-blue-bayou",
  title: "Blue Bayou",
  artistSlug: "kelly-clarkson",
  externalId: "653769c3-7a78-3b1b-9bcc-be7a6c335a1b",
  externalLink: "https://musicbrainz.org/work/653769c3-7a78-3b1b-9bcc-be7a6c335a1b",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
