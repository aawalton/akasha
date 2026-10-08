import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaBornYesterday = {
  id: "019ea4c2-ea8f-7b3d-9c81-67c004965fb1",
  type: "page-type/song",
  slug: "sia-born-yesterday",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "171a4b01-e71b-41a7-be86-c966bff6e40c",
      externalLink: "https://musicbrainz.org/work/171a4b01-e71b-41a7-be86-c966bff6e40c",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Born Yesterday",
  artist: "artist/sia",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-08T01:04:57.999Z",
  updatedAt: "2026-09-19T18:27:41.000Z",
} as const satisfies Song
