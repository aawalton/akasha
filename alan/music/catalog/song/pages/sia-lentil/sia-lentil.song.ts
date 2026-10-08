import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaLentil = {
  id: "019ea4c8-6e54-76fc-a2db-bfeeec8bf30b",
  type: "page-type/song",
  slug: "sia-lentil",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "743cd5b5-57b4-418e-b886-163ba9dd36b7",
      externalLink: "https://musicbrainz.org/work/743cd5b5-57b4-418e-b886-163ba9dd36b7",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Lentil",
  artist: "artist/sia",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-08T01:10:59.412Z",
  updatedAt: "2026-09-19T18:27:41.000Z",
} as const satisfies Song
