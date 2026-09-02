import type { Song } from "../../song.page-type.ts"

export const auroraHalfTheWorldAway = {
  id: "019ea4a7-4c57-7cf0-b863-cc2d9b04ea46",
  pageTypeSlug: "song",
  slug: "aurora-half-the-world-away",
  title: "Half the World Away",
  artistSlug: "aurora",
  externalId: "e8f3e2c8-7ad3-48cf-9394-616d1aca0708",
  externalLink: "https://musicbrainz.org/work/e8f3e2c8-7ad3-48cf-9394-616d1aca0708",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
