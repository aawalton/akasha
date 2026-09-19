import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaAngelByTheWings = {
  id: "019ea4c5-9aae-7a4a-b7b4-6dfa5e667662",
  type: "page-type/song",
  slug: "sia-angel-by-the-wings",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "bd735f3b-94cc-45c6-b124-791b293f1f14",
      externalLink: "https://musicbrainz.org/work/bd735f3b-94cc-45c6-b124-791b293f1f14",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Angel by the Wings",
  artist: "artist/sia",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
