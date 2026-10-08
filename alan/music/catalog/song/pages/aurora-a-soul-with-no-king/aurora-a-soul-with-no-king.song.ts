import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const auroraASoulWithNoKing = {
  id: "019ea4a4-af2f-7b44-a6a4-4f1cd3375d0c",
  type: "page-type/song",
  slug: "aurora-a-soul-with-no-king",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "4ad32540-a447-442f-be07-b89b172fcb2b",
      externalLink: "https://musicbrainz.org/work/4ad32540-a447-442f-be07-b89b172fcb2b",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "A Soul With No King",
  artist: "artist/aurora",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-08T00:31:56.719Z",
  updatedAt: "2026-09-19T18:27:18.000Z",
} as const satisfies Song
