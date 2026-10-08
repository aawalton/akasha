import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaWhatTheFutureHolds = {
  id: "019ea4cc-1730-78d8-8e59-d723ac55a5af",
  type: "page-type/song",
  slug: "sia-what-the-future-holds",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "443f6d04-3f6f-4430-83aa-59bfaaff8e7a",
      externalLink: "https://musicbrainz.org/work/443f6d04-3f6f-4430-83aa-59bfaaff8e7a",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "What the Future Holds",
  artist: "artist/sia",
  performed: false,
  written: "collab",
  createdAt: "2026-06-08T01:14:59.248Z",
  updatedAt: "2026-09-19T18:27:41.000Z",
} as const satisfies Song
