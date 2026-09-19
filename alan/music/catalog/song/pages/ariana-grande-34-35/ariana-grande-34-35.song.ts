import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrande3435 = {
  id: "019ea4e1-e73c-74a8-b6aa-e6b54cfd95ca",
  type: "page-type/song",
  slug: "ariana-grande-34-35",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "738d42ab-a9fa-4fa5-a77f-be4d705feaf9",
      externalLink: "https://musicbrainz.org/work/738d42ab-a9fa-4fa5-a77f-be4d705feaf9",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "34+35",
  artist: "artist/ariana-grande",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
