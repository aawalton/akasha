import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeWarm = {
  id: "019ea4e7-57f0-7d1f-9380-e3843678d0b6",
  type: "page-type/song",
  slug: "ariana-grande-warm",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "c20288f0-aec2-4be4-a54a-71d687d5eed0",
      externalLink: "https://musicbrainz.org/work/c20288f0-aec2-4be4-a54a-71d687d5eed0",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "warm",
  artist: "artist/ariana-grande",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-08T01:44:45.296Z",
  updatedAt: "2026-09-19T18:27:18.000Z",
} as const satisfies Song
