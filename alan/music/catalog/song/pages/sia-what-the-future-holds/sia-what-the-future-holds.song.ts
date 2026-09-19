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
  songType: "original",
  performed: false,
  written: "collab",
} as const satisfies Song
