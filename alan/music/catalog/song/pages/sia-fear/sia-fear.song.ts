import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaFear = {
  id: "019ea4c6-8ba3-7c93-8b7a-b7e90cc2c1fb",
  type: "page-type/song",
  slug: "sia-fear",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "01a65f9a-6e21-49ee-bf93-974513e079c2",
      externalLink: "https://musicbrainz.org/work/01a65f9a-6e21-49ee-bf93-974513e079c2",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Fear",
  artist: "artist/sia",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-08T01:08:55.843Z",
  updatedAt: "2026-09-19T18:27:41.000Z",
} as const satisfies Song
