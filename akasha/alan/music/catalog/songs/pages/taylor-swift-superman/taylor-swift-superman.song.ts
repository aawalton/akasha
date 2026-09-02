import type { Song } from "../../song.page-type.ts"

export const taylorSwiftSuperman = {
  id: "019ea416-3ce8-75d0-ba9e-2c5b6253fc06",
  pageTypeSlug: "song",
  slug: "taylor-swift-superman",
  title: "Superman",
  artistSlug: "taylor-swift",
  externalId: "cdf2af63-dc9b-4b32-a07c-f8f789bc4e4f",
  externalLink: "https://musicbrainz.org/work/cdf2af63-dc9b-4b32-a07c-f8f789bc4e4f",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
