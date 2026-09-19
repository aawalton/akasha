import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeLoveMeHarder = {
  id: "019ea4e6-08cc-7e2d-8f94-467174ec733e",
  type: "page-type/song",
  slug: "ariana-grande-love-me-harder",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "7822a325-e093-4794-8b34-d311f9058fb9",
      externalLink: "https://musicbrainz.org/work/7822a325-e093-4794-8b34-d311f9058fb9",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Love Me Harder",
  artist: "artist/ariana-grande",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
