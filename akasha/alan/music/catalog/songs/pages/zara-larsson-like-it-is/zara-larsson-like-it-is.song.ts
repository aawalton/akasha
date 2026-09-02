import type { Song } from "../../song.page-type.ts"

export const zaraLarssonLikeItIs = {
  id: "019ea4a0-17f8-75bb-bdbd-5bf1187b115d",
  pageTypeSlug: "song",
  slug: "zara-larsson-like-it-is",
  title: "Like It Is",
  artistSlug: "zara-larsson",
  externalId: "79ccdc85-594d-488d-84e6-655580a0335f",
  externalLink: "https://musicbrainz.org/work/79ccdc85-594d-488d-84e6-655580a0335f",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
