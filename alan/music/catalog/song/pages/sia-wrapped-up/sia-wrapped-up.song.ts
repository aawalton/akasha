import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaWrappedUp = {
  id: "019ea4ca-bcc2-71c0-b095-bcfffa4340a8",
  type: "page-type/song",
  slug: "sia-wrapped-up",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "1290c605-2b58-470a-bcdc-508ba765d28d",
      externalLink: "https://musicbrainz.org/work/1290c605-2b58-470a-bcdc-508ba765d28d",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Wrapped Up",
  artist: "artist/sia",
  performed: false,
  written: "collab",
  createdAt: "2026-06-08T01:13:30.562Z",
  updatedAt: "2026-09-19T18:27:41.000Z",
} as const satisfies Song
