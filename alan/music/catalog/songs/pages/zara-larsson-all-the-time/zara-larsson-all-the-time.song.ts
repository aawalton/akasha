import type { Song } from "../../song.page-type.ts"

export const zaraLarssonAllTheTime = {
  id: "019ea49f-b2da-7176-bf61-5676f012edfd",
  pageTypeSlug: "song",
  slug: "zara-larsson-all-the-time",
  title: "All the Time",
  artistSlug: "zara-larsson",
  externalId: "5caf5786-f6a5-4c02-969e-819a1f878e54",
  externalLink: "https://musicbrainz.org/work/5caf5786-f6a5-4c02-969e-819a1f878e54",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
