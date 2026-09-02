import type { Song } from "../../song.page-type.ts"

export const taylorSwiftTheBlackDog = {
  id: "019ea416-3597-7445-b8d5-95a65138af9f",
  pageTypeSlug: "song",
  slug: "taylor-swift-the-black-dog",
  title: "The Black Dog",
  artistSlug: "taylor-swift",
  externalId: "60c70525-0bcd-483a-9fd2-ff7b10cfb069",
  externalLink: "https://musicbrainz.org/work/60c70525-0bcd-483a-9fd2-ff7b10cfb069",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
