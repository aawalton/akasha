import type { Song } from "../../song.page-type.ts"

export const jessicaBaioRadio = {
  id: "019ea4f8-9627-75eb-b6dd-8ae49bc57a1f",
  pageTypeSlug: "song",
  slug: "jessica-baio-radio",
  title: "Radio",
  artistSlug: "jessica-baio",
  externalId: "af005ffe-1b47-4c2d-84dc-e5a80615d774",
  externalLink: "https://musicbrainz.org/recording/af005ffe-1b47-4c2d-84dc-e5a80615d774",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
