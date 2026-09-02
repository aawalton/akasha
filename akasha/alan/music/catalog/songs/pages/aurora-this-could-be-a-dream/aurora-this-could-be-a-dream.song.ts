import type { Song } from "../../song.page-type.ts"

export const auroraThisCouldBeADream = {
  id: "019ea4a7-9471-7c85-aca5-da4d2e7d435c",
  pageTypeSlug: "song",
  slug: "aurora-this-could-be-a-dream",
  title: "This Could Be a Dream",
  artistSlug: "aurora",
  externalId: "f2dfa16d-2f97-4675-9adb-09c75ceac3c8",
  externalLink: "https://musicbrainz.org/work/f2dfa16d-2f97-4675-9adb-09c75ceac3c8",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
