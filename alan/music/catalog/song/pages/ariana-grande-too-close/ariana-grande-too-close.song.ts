import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeTooClose = {
  id: "019ea4e5-7d28-78ed-a70a-49f559b15c54",
  type: "page-type/song",
  slug: "ariana-grande-too-close",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "6115c215-ef85-4c6c-ac8d-6308f11b4c2e",
      externalLink: "https://musicbrainz.org/work/6115c215-ef85-4c6c-ac8d-6308f11b4c2e",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Too Close",
  artist: "artist/ariana-grande",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
