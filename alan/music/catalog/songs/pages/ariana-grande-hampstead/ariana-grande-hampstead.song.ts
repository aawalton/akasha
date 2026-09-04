import type { Song } from "../../song.page-type.ts"

export const arianaGrandeHampstead = {
  id: "019ea4e2-0d4a-76f1-a675-fa5cb7c596ca",
  pageTypeSlug: "song",
  slug: "ariana-grande-hampstead",
  title: "Hampstead",
  artistSlug: "ariana-grande",
  externalId: "7a0c5d9e-c898-41b4-a516-fc1bf716cc87",
  externalLink: "https://musicbrainz.org/work/7a0c5d9e-c898-41b4-a516-fc1bf716cc87",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
