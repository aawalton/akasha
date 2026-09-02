import type { Song } from "../../song.page-type.ts"

export const auroraChurchyard = {
  id: "019ea4a6-fd83-761e-b4fd-3ccc20a7ceb0",
  pageTypeSlug: "song",
  slug: "aurora-churchyard",
  title: "Churchyard",
  artistSlug: "aurora",
  externalId: "c6758a17-228b-4cdf-bab4-958abf674be3",
  externalLink: "https://musicbrainz.org/work/c6758a17-228b-4cdf-bab4-958abf674be3",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
