import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaFreezeYouOut = {
  id: "019ea4c9-1f06-7f2b-b088-0a74ed5ad509",
  type: "page-type/song",
  slug: "sia-freeze-you-out",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "8d803f97-dd75-4ceb-ac37-4d38d0e4ad18",
      externalLink: "https://musicbrainz.org/work/8d803f97-dd75-4ceb-ac37-4d38d0e4ad18",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Freeze You Out",
  artist: "artist/sia",
  performed: false,
  written: "collab",
  createdAt: "2026-06-08T01:11:44.646Z",
  updatedAt: "2026-09-19T18:27:41.000Z",
} as const satisfies Song
