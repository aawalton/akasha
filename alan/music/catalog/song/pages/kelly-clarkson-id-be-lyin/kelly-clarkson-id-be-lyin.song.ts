import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const kellyClarksonIdBeLyin = {
  id: "01a0ba7f-9ecb-7bba-b8b7-bc20a5ac6b31",
  type: "page-type/song",
  slug: "kelly-clarkson-id-be-lyin",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "38b8bfe7-27b5-4870-9d58-7ffe7c830dc8",
      externalLink: "https://musicbrainz.org/work/38b8bfe7-27b5-4870-9d58-7ffe7c830dc8",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "I’d Be Lyin’",
  artist: "artist/kelly-clarkson",
  performed: true,
  written: "collab",
} as const satisfies Song
