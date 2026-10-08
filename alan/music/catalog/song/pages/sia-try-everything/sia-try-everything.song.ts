import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaTryEverything = {
  id: "019ea4ce-ad1a-7fcb-9f9a-9231417152c1",
  type: "page-type/song",
  slug: "sia-try-everything",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "fd98ce8b-a512-45ce-b710-e1dbfce39e91",
      externalLink: "https://musicbrainz.org/work/fd98ce8b-a512-45ce-b710-e1dbfce39e91",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Try Everything",
  artist: "artist/sia",
  performed: false,
  written: "collab",
  createdAt: "2026-06-08T01:17:48.698Z",
  updatedAt: "2026-09-19T18:27:41.000Z",
} as const satisfies Song
