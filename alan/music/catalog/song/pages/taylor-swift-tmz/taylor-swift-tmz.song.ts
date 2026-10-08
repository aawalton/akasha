import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftTmz = {
  id: "019ea416-46f5-7364-8a0a-779efe80a784",
  type: "page-type/song",
  slug: "taylor-swift-tmz",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "839fca48-3c66-4d31-aa65-931fc65ddf77",
      externalLink: "https://musicbrainz.org/work/839fca48-3c66-4d31-aa65-931fc65ddf77",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "TMZ",
  artist: "artist/taylor-swift",
  performed: false,
  written: "collab",
  createdAt: "2026-06-07T21:56:23.925Z",
  updatedAt: "2026-09-19T18:27:41.000Z",
} as const satisfies Song
