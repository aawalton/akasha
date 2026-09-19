import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const kellyClarksonCatchMyBreath = {
  id: "019ea4ae-dc91-7f1b-abe7-2e2ec2914695",
  type: "page-type/song",
  slug: "kelly-clarkson-catch-my-breath",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "6f8011b9-4039-40f6-8b11-96d2117dfe89",
      externalLink: "https://musicbrainz.org/work/6f8011b9-4039-40f6-8b11-96d2117dfe89",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Catch My Breath",
  artist: "artist/kelly-clarkson",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
