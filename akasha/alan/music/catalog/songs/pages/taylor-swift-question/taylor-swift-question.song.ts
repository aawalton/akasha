import type { Song } from "../../song.page-type.ts"

export const taylorSwiftQuestion = {
  id: "019ea416-34ba-70bd-bb47-110f7a9ea892",
  pageTypeSlug: "song",
  slug: "taylor-swift-question",
  title: "Question…?",
  artistSlug: "taylor-swift",
  externalId: "5a5bef29-1511-4f50-9681-45464830c905",
  externalLink: "https://musicbrainz.org/work/5a5bef29-1511-4f50-9681-45464830c905",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
