import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeDecember = {
  id: "019ea4e3-9c43-7ceb-a0fa-2599ce05f163",
  type: "page-type/song",
  slug: "ariana-grande-december",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "e12e4481-e944-4810-921c-3cb9b3fd946c",
      externalLink: "https://musicbrainz.org/work/e12e4481-e944-4810-921c-3cb9b3fd946c",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "December",
  artist: "artist/ariana-grande",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
