import type { Song } from "../../song.page-type.ts"

export const kellyClarksonCatchMyBreath = {
  id: "019ea4ae-dc91-7f1b-abe7-2e2ec2914695",
  pageTypeSlug: "song",
  slug: "kelly-clarkson-catch-my-breath",
  title: "Catch My Breath",
  artistSlug: "kelly-clarkson",
  externalId: "6f8011b9-4039-40f6-8b11-96d2117dfe89",
  externalLink: "https://musicbrainz.org/work/6f8011b9-4039-40f6-8b11-96d2117dfe89",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
