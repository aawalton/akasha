import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaShadow = {
  id: "019ea4ca-9c4b-7225-8806-252c3ce83765",
  type: "page-type/song",
  slug: "sia-shadow",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "09b1da49-762d-4b8d-95d3-4317ed1000fa",
      externalLink: "https://musicbrainz.org/work/09b1da49-762d-4b8d-95d3-4317ed1000fa",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Shadow",
  artist: "artist/sia",
  songType: "original",
  performed: true,
  written: "collab",
} as const satisfies Song
