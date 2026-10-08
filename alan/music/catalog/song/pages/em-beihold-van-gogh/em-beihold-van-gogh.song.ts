import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const emBeiholdVanGogh = {
  id: "019ea4df-78f1-7bc4-a7d2-81bc4ccf3ce8",
  type: "page-type/song",
  slug: "em-beihold-van-gogh",
  title: "Van Gogh",
  artist: "artist/em-beihold",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "ba60d3e5-fc85-4672-ba3d-6fed55ee9e2f",
      externalLink: "https://musicbrainz.org/work/ba60d3e5-fc85-4672-ba3d-6fed55ee9e2f",
      lastSyncedAt: "2026-06-08",
    },
  ],
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-08T01:36:09.457Z",
  updatedAt: "2026-09-19T18:27:18.000Z",
} as const satisfies Song
