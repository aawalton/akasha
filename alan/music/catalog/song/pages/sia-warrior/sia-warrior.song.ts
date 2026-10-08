import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaWarrior = {
  id: "019ea4cd-8ca5-7161-9afd-bc5352879338",
  type: "page-type/song",
  slug: "sia-warrior",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "aabd7364-1fb4-4606-b274-b23cfb5ee7dd",
      externalLink: "https://musicbrainz.org/work/aabd7364-1fb4-4606-b274-b23cfb5ee7dd",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Warrior",
  artist: "artist/sia",
  performed: false,
  written: "collab",
  createdAt: "2026-06-08T01:16:34.853Z",
  updatedAt: "2026-09-19T18:27:41.000Z",
} as const satisfies Song
