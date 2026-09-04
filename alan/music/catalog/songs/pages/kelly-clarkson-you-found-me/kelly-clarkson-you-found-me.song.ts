import type { Song } from "../../song.page-type.ts"

export const kellyClarksonYouFoundMe = {
  id: "019ea4c1-3cd5-7705-a8d5-0ab9266d7174",
  pageTypeSlug: "song",
  slug: "kelly-clarkson-you-found-me",
  title: "You Found Me",
  artistSlug: "kelly-clarkson",
  externalId: "af585333-04de-38b2-95f6-f1276a89f931",
  externalLink: "https://musicbrainz.org/work/af585333-04de-38b2-95f6-f1276a89f931",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
