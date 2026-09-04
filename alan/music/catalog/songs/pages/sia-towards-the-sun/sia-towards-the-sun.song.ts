import type { Song } from "../../song.page-type.ts"

export const siaTowardsTheSun = {
  id: "019ea4cb-9f97-7670-b809-e97d82d477d0",
  pageTypeSlug: "song",
  slug: "sia-towards-the-sun",
  title: "Towards the Sun",
  artistSlug: "sia",
  externalId: "2e886392-6968-4c66-9aca-a2b921f54698",
  externalLink: "https://musicbrainz.org/work/2e886392-6968-4c66-9aca-a2b921f54698",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
