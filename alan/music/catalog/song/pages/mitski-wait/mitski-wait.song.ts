import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const mitskiWait = {
  id: "019f0ea1-ec15-7129-a742-6d2b588050e1",
  type: "page-type/song",
  slug: "mitski-wait",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "73877ab4-3b37-41e0-837a-63bdcbc11695",
      externalLink: "https://musicbrainz.org/work/73877ab4-3b37-41e0-837a-63bdcbc11695",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Wait",
  artist: "artist/mitski",
  performed: true,
  written: "collab",
  createdAt: "2026-06-28T14:28:40.597Z",
  updatedAt: "2026-09-19T18:27:18.000Z",
} as const satisfies Song
