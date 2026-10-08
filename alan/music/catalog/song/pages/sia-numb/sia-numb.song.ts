import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaNumb = {
  id: "019ea4c7-5626-7a4b-bbe2-c432c2b60ba7",
  type: "page-type/song",
  slug: "sia-numb",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "3a72a0b3-7044-4014-8026-2a0fdca4573f",
      externalLink: "https://musicbrainz.org/work/3a72a0b3-7044-4014-8026-2a0fdca4573f",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Numb",
  artist: "artist/sia",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-08T01:09:47.686Z",
  updatedAt: "2026-09-19T18:27:41.000Z",
} as const satisfies Song
