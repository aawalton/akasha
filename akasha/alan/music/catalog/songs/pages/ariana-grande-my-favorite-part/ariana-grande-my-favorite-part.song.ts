import type { Song } from "../../song.page-type.ts"

export const arianaGrandeMyFavoritePart = {
  id: "019ea4e7-7240-7f39-855b-9c4e90b77c70",
  pageTypeSlug: "song",
  slug: "ariana-grande-my-favorite-part",
  title: "My Favorite Part",
  artistSlug: "ariana-grande",
  externalId: "c5175673-e2e2-4fbe-b8c3-0038a6bb72eb",
  externalLink: "https://musicbrainz.org/work/c5175673-e2e2-4fbe-b8c3-0038a6bb72eb",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
