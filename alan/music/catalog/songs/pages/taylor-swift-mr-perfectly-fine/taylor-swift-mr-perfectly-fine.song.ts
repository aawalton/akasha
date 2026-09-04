import type { Song } from "../../song.page-type.ts"

export const taylorSwiftMrPerfectlyFine = {
  id: "019ea416-4184-7a27-9340-97ba2e27ff04",
  pageTypeSlug: "song",
  slug: "taylor-swift-mr-perfectly-fine",
  title: "Mr. Perfectly Fine",
  artistSlug: "taylor-swift",
  externalId: "f4bd40da-3b35-4126-9e6a-f95f38fd2fdb",
  externalLink: "https://musicbrainz.org/work/f4bd40da-3b35-4126-9e6a-f95f38fd2fdb",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
