import type { Song } from "../../song.page-type.ts"

export const taylorSwiftThisLove = {
  id: "019ea416-4320-78e2-9474-cdbf0048bf5e",
  pageTypeSlug: "song",
  slug: "taylor-swift-this-love",
  title: "This Love",
  artistSlug: "taylor-swift",
  externalId: "1183e3b3-e6c9-46b3-a38a-ebd767ee3104",
  externalLink: "https://musicbrainz.org/work/1183e3b3-e6c9-46b3-a38a-ebd767ee3104",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
