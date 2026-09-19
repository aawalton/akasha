import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const imagineDragonsForeverYoung = {
  id: "019ea49b-3450-76e5-817a-e8d9f122e9e9",
  type: "page-type/song",
  slug: "imagine-dragons-forever-young",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "f8c51ad3-75f0-34da-91e9-9c76e02066cf",
      externalLink: "https://musicbrainz.org/work/f8c51ad3-75f0-34da-91e9-9c76e02066cf",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Forever Young",
  artist: "artist/imagine-dragons",
  performed: true,
} as const satisfies Song
