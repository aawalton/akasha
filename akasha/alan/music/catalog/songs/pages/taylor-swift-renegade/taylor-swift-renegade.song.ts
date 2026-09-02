import type { Song } from "../../song.page-type.ts"

export const taylorSwiftRenegade = {
  id: "019ea416-32e9-7f35-843d-a54425580058",
  pageTypeSlug: "song",
  slug: "taylor-swift-renegade",
  title: "Renegade",
  artistSlug: "taylor-swift",
  externalId: "4fb69b7f-ae79-40f8-92cf-f59496ec5feb",
  externalLink: "https://musicbrainz.org/work/4fb69b7f-ae79-40f8-92cf-f59496ec5feb",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
