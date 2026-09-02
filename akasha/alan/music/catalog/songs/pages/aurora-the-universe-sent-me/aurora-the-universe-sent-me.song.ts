import type { Song } from "../../song.page-type.ts"

export const auroraTheUniverseSentMe = {
  id: "019ea4a3-d6d2-7f01-8f9e-92f480694e3d",
  pageTypeSlug: "song",
  slug: "aurora-the-universe-sent-me",
  title: "The Universe Sent Me",
  artistSlug: "aurora",
  externalId: "26d29272-0967-487d-896e-a9578a04c808",
  externalLink: "https://musicbrainz.org/work/26d29272-0967-487d-896e-a9578a04c808",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: false,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
