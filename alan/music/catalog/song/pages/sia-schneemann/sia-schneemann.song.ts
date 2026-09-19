import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaSchneemann = {
  id: "019ea4ca-84e6-7142-b0ee-d8fd9a8425b6",
  type: "page-type/song",
  slug: "sia-schneemann",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "01f58a94-41b9-4b51-bd55-50214fbbb566",
      externalLink: "https://musicbrainz.org/work/01f58a94-41b9-4b51-bd55-50214fbbb566",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Schneemann",
  artist: "artist/sia",
  performed: false,
  written: "collab",
} as const satisfies Song
