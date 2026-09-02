import type { Song } from "../../song.page-type.ts"

export const zaraLarssonMaryDidYouKnow = {
  id: "019ea49d-e4e5-7e70-85fa-0d044c11a2ad",
  pageTypeSlug: "song",
  slug: "zara-larsson-mary-did-you-know",
  title: "Mary, Did You Know?",
  artistSlug: "zara-larsson",
  externalId: "0d13f922-ddbb-4382-83bb-a500c37ca563",
  externalLink: "https://musicbrainz.org/work/0d13f922-ddbb-4382-83bb-a500c37ca563",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
