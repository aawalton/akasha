import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaHeyHeyHey = {
  id: "019ea4c9-f09d-7bce-b8b6-5f82dfc9d6cd",
  type: "page-type/song",
  slug: "sia-hey-hey-hey",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "da1f69fa-ffdd-42fe-8640-c355ff5a5148",
      externalLink: "https://musicbrainz.org/work/da1f69fa-ffdd-42fe-8640-c355ff5a5148",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Hey Hey Hey",
  artist: "artist/sia",
  performed: false,
  written: "collab",
} as const satisfies Song
