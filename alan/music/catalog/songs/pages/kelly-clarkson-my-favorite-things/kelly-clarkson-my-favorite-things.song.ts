import type { Song } from "../../song.page-type.ts"

export const kellyClarksonMyFavoriteThings = {
  id: "019ea4b0-d4f3-7dbd-baf9-2135bef475ad",
  pageTypeSlug: "song",
  slug: "kelly-clarkson-my-favorite-things",
  title: "My Favorite Things",
  artistSlug: "kelly-clarkson",
  externalId: "edf0bfbc-c9e4-3b7d-9765-e8b86d9febbc",
  externalLink: "https://musicbrainz.org/work/edf0bfbc-c9e4-3b7d-9765-e8b86d9febbc",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
