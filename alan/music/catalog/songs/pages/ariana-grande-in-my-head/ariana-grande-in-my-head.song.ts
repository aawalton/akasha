import type { Song } from "../../song.page-type.ts"

export const arianaGrandeInMyHead = {
  id: "019ea4e2-310b-7579-b3dc-225df5ce2af7",
  pageTypeSlug: "song",
  slug: "ariana-grande-in-my-head",
  title: "in my head",
  artistSlug: "ariana-grande",
  externalId: "847fb363-db90-4494-9153-ad3ae72dfca9",
  externalLink: "https://musicbrainz.org/work/847fb363-db90-4494-9153-ad3ae72dfca9",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
