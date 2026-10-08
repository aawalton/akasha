import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaDonTBringMeDown = {
  id: "019ea4c5-ea63-7116-9b3f-b249de55a1ea",
  type: "page-type/song",
  slug: "sia-don-t-bring-me-down",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "d40f58c9-f4fa-49df-8dfa-8c37e3b4e240",
      externalLink: "https://musicbrainz.org/work/d40f58c9-f4fa-49df-8dfa-8c37e3b4e240",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Don’t Bring Me Down",
  artist: "artist/sia",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-08T01:08:14.563Z",
  updatedAt: "2026-09-19T18:27:41.000Z",
} as const satisfies Song
