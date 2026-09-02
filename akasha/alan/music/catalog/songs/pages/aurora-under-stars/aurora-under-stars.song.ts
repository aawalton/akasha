import type { Song } from "../../song.page-type.ts"

export const auroraUnderStars = {
  id: "019ea4a3-0db8-7d4b-80b6-a7f4860f11bd",
  pageTypeSlug: "song",
  slug: "aurora-under-stars",
  title: "Under Stars",
  artistSlug: "aurora",
  externalId: "0c7b93d8-caf4-477e-9fc4-2766888fd2c3",
  externalLink: "https://musicbrainz.org/work/0c7b93d8-caf4-477e-9fc4-2766888fd2c3",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
