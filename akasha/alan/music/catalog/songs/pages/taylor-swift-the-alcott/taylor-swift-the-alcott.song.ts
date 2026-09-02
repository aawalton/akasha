import type { Song } from "../../song.page-type.ts"

export const taylorSwiftTheAlcott = {
  id: "019ea416-3786-721a-a432-21758622a5d5",
  pageTypeSlug: "song",
  slug: "taylor-swift-the-alcott",
  title: "The Alcott",
  artistSlug: "taylor-swift",
  externalId: "76e74ffe-9eb7-46bc-bf29-f67f89710203",
  externalLink: "https://musicbrainz.org/work/76e74ffe-9eb7-46bc-bf29-f67f89710203",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
