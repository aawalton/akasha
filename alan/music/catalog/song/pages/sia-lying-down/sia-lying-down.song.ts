import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaLyingDown = {
  id: "019ea4c7-d5a6-7e17-9db8-abd0c9c4386c",
  type: "page-type/song",
  slug: "sia-lying-down",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "57ee6cbc-2847-4b6c-af15-49c569c12534",
      externalLink: "https://musicbrainz.org/work/57ee6cbc-2847-4b6c-af15-49c569c12534",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Lying Down",
  artist: "artist/sia",
  songType: "original",
  performed: false,
  written: "collab",
} as const satisfies Song
