import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaDoubleRainbow = {
  id: "019ea4c4-937b-7681-aea9-642b80efe20e",
  type: "page-type/song",
  slug: "sia-double-rainbow",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "8549b012-b041-48b8-9e91-1323def803fa",
      externalLink: "https://musicbrainz.org/work/8549b012-b041-48b8-9e91-1323def803fa",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Double Rainbow",
  artist: "artist/sia",
  performed: false,
  written: "collab",
  createdAt: "2026-06-08T01:06:46.779Z",
  updatedAt: "2026-09-19T18:27:41.000Z",
} as const satisfies Song
