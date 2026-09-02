import type { Song } from "../../song.page-type.ts"

export const auroraSoftUniverse = {
  id: "019ea4a4-58bc-72a9-907c-88178b31e6fb",
  pageTypeSlug: "song",
  slug: "aurora-soft-universe",
  title: "Soft Universe",
  artistSlug: "aurora",
  externalId: "41c28a9a-10d5-4396-ad55-d351a529cbf9",
  externalLink: "https://musicbrainz.org/work/41c28a9a-10d5-4396-ad55-d351a529cbf9",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
