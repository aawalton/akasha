import type { Song } from "../../song.page-type.ts"

export const taylorSwiftDonTYou = {
  id: "019ea416-1198-7f71-8441-fd481dac8692",
  pageTypeSlug: "song",
  slug: "taylor-swift-don-t-you",
  title: "Don’t You",
  artistSlug: "taylor-swift",
  externalId: "ac68749b-c89c-4107-b3ad-aed726a57a19",
  externalLink: "https://musicbrainz.org/work/ac68749b-c89c-4107-b3ad-aed726a57a19",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
