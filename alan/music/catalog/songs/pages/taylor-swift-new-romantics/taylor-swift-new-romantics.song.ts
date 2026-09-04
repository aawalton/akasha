import type { Song } from "../../song.page-type.ts"

export const taylorSwiftNewRomantics = {
  id: "019ea416-38b5-79dc-b632-1040644c7699",
  pageTypeSlug: "song",
  slug: "taylor-swift-new-romantics",
  title: "New Romantics",
  artistSlug: "taylor-swift",
  externalId: "8828a9c2-ffde-429f-b3e7-de6a73fbfd36",
  externalLink: "https://musicbrainz.org/work/8828a9c2-ffde-429f-b3e7-de6a73fbfd36",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
