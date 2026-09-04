import type { Song } from "../../song.page-type.ts"

export const kellyClarksonDanceWithMe = {
  id: "019ea4ad-e863-7caa-9a05-8c5e485aeadd",
  pageTypeSlug: "song",
  slug: "kelly-clarkson-dance-with-me",
  title: "Dance With Me",
  artistSlug: "kelly-clarkson",
  externalId: "42ae0500-e18a-425b-8a72-c45f6aa3b650",
  externalLink: "https://musicbrainz.org/work/42ae0500-e18a-425b-8a72-c45f6aa3b650",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
