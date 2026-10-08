import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaCryingInTheClub = {
  id: "019ea4c2-bda1-7eab-a463-99b2c299396a",
  type: "page-type/song",
  slug: "sia-crying-in-the-club",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "0c64e949-b470-4304-aa18-1bda9f597cf0",
      externalLink: "https://musicbrainz.org/work/0c64e949-b470-4304-aa18-1bda9f597cf0",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Crying in the Club",
  artist: "artist/sia",
  performed: false,
  written: "collab",
  createdAt: "2026-06-08T01:04:46.497Z",
  updatedAt: "2026-09-19T18:27:41.000Z",
} as const satisfies Song
