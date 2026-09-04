import type { Song } from "../../song.page-type.ts"

export const taylorSwiftCarolina = {
  id: "019ea416-0c7f-7ef8-a5d2-1bc527aa7081",
  pageTypeSlug: "song",
  slug: "taylor-swift-carolina",
  title: "Carolina",
  artistSlug: "taylor-swift",
  externalId: "7b854adc-cb55-487a-b3ea-da2125d06d09",
  externalLink: "https://musicbrainz.org/work/7b854adc-cb55-487a-b3ea-da2125d06d09",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
