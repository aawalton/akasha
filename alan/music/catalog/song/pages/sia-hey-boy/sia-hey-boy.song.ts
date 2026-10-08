import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaHeyBoy = {
  id: "019ea4c8-32ed-71af-890a-e2edbe0a1747",
  type: "page-type/song",
  slug: "sia-hey-boy",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "6c6aa30c-3c6d-4861-9f08-26666a610dc7",
      externalLink: "https://musicbrainz.org/work/6c6aa30c-3c6d-4861-9f08-26666a610dc7",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Hey Boy",
  artist: "artist/sia",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-08T01:10:44.205Z",
  updatedAt: "2026-09-19T18:27:41.000Z",
} as const satisfies Song
