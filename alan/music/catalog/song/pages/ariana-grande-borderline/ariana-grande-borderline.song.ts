import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeBorderline = {
  id: "019ea4e3-1e36-709e-a184-df68e807c4b0",
  type: "page-type/song",
  slug: "ariana-grande-borderline",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "c6b616e6-ced1-4692-b1ca-42a9c0f7e2d9",
      externalLink: "https://musicbrainz.org/work/c6b616e6-ced1-4692-b1ca-42a9c0f7e2d9",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "borderline",
  artist: "artist/ariana-grande",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-08T01:40:08.374Z",
  updatedAt: "2026-09-19T18:27:18.000Z",
} as const satisfies Song
