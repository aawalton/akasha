import type { Song } from "akasha/alan/music/catalog/songs/song.page-type.types.ts"

export const kellyClarksonCatchMyBreath = {
  id: "019ea4ae-dc91-7f1b-abe7-2e2ec2914695",
  type: "song",
  slug: "kelly-clarkson-catch-my-breath",
  title: "Catch My Breath",
  artist: "kelly-clarkson",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "6f8011b9-4039-40f6-8b11-96d2117dfe89",
      externalLink: "https://musicbrainz.org/work/6f8011b9-4039-40f6-8b11-96d2117dfe89",
      lastSyncedAt: "2026-06-08",
    },
  ],
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
