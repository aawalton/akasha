import type { Song } from "../../song.page-type.ts"

export const kellyClarksonOneMinute = {
  id: "019ea4b2-f285-78ff-a1e9-f03f50830364",
  pageTypeSlug: "song",
  slug: "kelly-clarkson-one-minute",
  title: "One Minute",
  artistSlug: "kelly-clarkson",
  externalId: "946a061f-1454-4849-88a4-4583731b5be8",
  externalLink: "https://musicbrainz.org/work/946a061f-1454-4849-88a4-4583731b5be8",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
