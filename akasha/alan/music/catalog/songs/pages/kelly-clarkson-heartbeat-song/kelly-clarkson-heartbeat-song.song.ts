import type { Song } from "../../song.page-type.ts"

export const kellyClarksonHeartbeatSong = {
  id: "019ea4b0-98be-722f-bb57-e70d60e988d1",
  pageTypeSlug: "song",
  slug: "kelly-clarkson-heartbeat-song",
  title: "Heartbeat Song",
  artistSlug: "kelly-clarkson",
  externalId: "d7e2dac9-57b6-4561-9698-670fc54bc4c1",
  externalLink: "https://musicbrainz.org/work/d7e2dac9-57b6-4561-9698-670fc54bc4c1",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
