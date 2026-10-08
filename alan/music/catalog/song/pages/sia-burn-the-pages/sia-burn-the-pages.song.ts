import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaBurnThePages = {
  id: "019ea4c5-735b-736d-ba70-8ffb42ed92e8",
  type: "page-type/song",
  slug: "sia-burn-the-pages",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "b7da8e9e-b9ee-4391-8063-808a76699aa3",
      externalLink: "https://musicbrainz.org/work/b7da8e9e-b9ee-4391-8063-808a76699aa3",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Burn the Pages",
  artist: "artist/sia",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-08T01:07:44.091Z",
  updatedAt: "2026-09-19T18:27:41.000Z",
} as const satisfies Song
