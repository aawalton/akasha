import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaSomersault = {
  id: "019ea4cd-3455-7667-9031-4c40f186d188",
  type: "page-type/song",
  slug: "sia-somersault",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "9505d156-19e7-4e9c-8f7e-24f8a3dc636d",
      externalLink: "https://musicbrainz.org/work/9505d156-19e7-4e9c-8f7e-24f8a3dc636d",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Somersault",
  artist: "artist/sia",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-08T01:16:12.245Z",
  updatedAt: "2026-09-19T18:27:41.000Z",
} as const satisfies Song
