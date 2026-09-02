import type { Song } from "../../song.page-type.ts"

export const arianaGrandeBeAlright = {
  id: "019ea4e1-96d6-7943-ba82-b6d59802ec35",
  pageTypeSlug: "song",
  slug: "ariana-grande-be-alright",
  title: "Be Alright",
  artistSlug: "ariana-grande",
  externalId: "67d75471-1309-4572-8b51-75e94f3f8612",
  externalLink: "https://musicbrainz.org/work/67d75471-1309-4572-8b51-75e94f3f8612",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
