import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaPrettyHurts = {
  id: "019ea4cd-d5e9-77bb-9ecd-f94f24069331",
  type: "page-type/song",
  slug: "sia-pretty-hurts",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "b74f6e80-4ab4-42cd-9edf-1feffa3c185a",
      externalLink: "https://musicbrainz.org/work/b74f6e80-4ab4-42cd-9edf-1feffa3c185a",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Pretty Hurts",
  artist: "artist/sia",
  performed: false,
  written: "collab",
  createdAt: "2026-06-08T01:16:53.609Z",
  updatedAt: "2026-09-19T18:27:41.000Z",
} as const satisfies Song
