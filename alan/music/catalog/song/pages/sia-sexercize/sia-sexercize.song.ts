import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaSexercize = {
  id: "019ea4cc-a3e5-77fe-b7f2-9fd34e220903",
  type: "page-type/song",
  slug: "sia-sexercize",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "71d7be03-4639-4368-9582-f5741556393e",
      externalLink: "https://musicbrainz.org/work/71d7be03-4639-4368-9582-f5741556393e",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Sexercize",
  artist: "artist/sia",
  performed: false,
  written: "collab",
  createdAt: "2026-06-08T01:15:35.269Z",
  updatedAt: "2026-09-19T18:27:41.000Z",
} as const satisfies Song
