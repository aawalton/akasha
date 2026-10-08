import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaIWillGetOverYou = {
  id: "019ea4c8-b5ba-7542-a4e0-a4f629cccb48",
  type: "page-type/song",
  slug: "sia-i-will-get-over-you",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "7c0e5ccc-f291-40cd-a393-a17446aa2ec0",
      externalLink: "https://musicbrainz.org/work/7c0e5ccc-f291-40cd-a393-a17446aa2ec0",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "I Will Get Over You",
  artist: "artist/sia",
  performed: false,
  written: "collab",
  createdAt: "2026-06-08T01:11:17.690Z",
  updatedAt: "2026-09-19T18:27:41.000Z",
} as const satisfies Song
