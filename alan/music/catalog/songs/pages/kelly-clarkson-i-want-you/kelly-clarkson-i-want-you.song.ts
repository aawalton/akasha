import type { Song } from "../../song.page-type.types.ts"

export const kellyClarksonIWantYou = {
  id: "019ea4af-d1ca-7614-8e46-8e32a7cb1638",
  pageTypeSlug: "song",
  type: "song",
  slug: "kelly-clarkson-i-want-you",
  title: "I Want You",
  artist: "kelly-clarkson",
  externalId: "bcf99e0a-38c3-301e-b462-0e8918b4566d",
  externalLink: "https://musicbrainz.org/work/bcf99e0a-38c3-301e-b462-0e8918b4566d",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
