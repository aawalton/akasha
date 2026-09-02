import type { Song } from "../../song.page-type.ts"

export const kellyClarksonTieItUp = {
  id: "019ea4c1-7fef-7ded-8a8b-5ec3229c2c1e",
  pageTypeSlug: "song",
  slug: "kelly-clarkson-tie-it-up",
  title: "Tie It Up",
  artistSlug: "kelly-clarkson",
  externalId: "e08284df-a4bb-4087-8567-2e4bf4c2401c",
  externalLink: "https://musicbrainz.org/work/e08284df-a4bb-4087-8567-2e4bf4c2401c",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
