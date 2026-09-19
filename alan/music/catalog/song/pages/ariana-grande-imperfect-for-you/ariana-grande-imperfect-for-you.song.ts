import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeImperfectForYou = {
  id: "019ea4e0-b52b-7333-bc4b-e96442e5572d",
  type: "page-type/song",
  slug: "ariana-grande-imperfect-for-you",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "203efb6c-2edf-41ce-bd0b-9ba4f399f1c1",
      externalLink: "https://musicbrainz.org/work/203efb6c-2edf-41ce-bd0b-9ba4f399f1c1",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "imperfect for you",
  artist: "artist/ariana-grande",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
