import type { Song } from "../../song.page-type.ts"

export const kellyClarksonBecauseOfYou = {
  id: "019ea4b0-629d-7d14-875b-8b92824532b7",
  pageTypeSlug: "song",
  slug: "kelly-clarkson-because-of-you",
  title: "Because of You",
  artistSlug: "kelly-clarkson",
  externalId: "d34e2b1a-f29b-3e55-aa52-545846dae40e",
  externalLink: "https://musicbrainz.org/work/d34e2b1a-f29b-3e55-aa52-545846dae40e",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
