import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaPerfume = {
  id: "019ea4cd-5526-7934-88e8-d64bc251d77e",
  type: "page-type/song",
  slug: "sia-perfume",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "9b03dfbe-6f11-4d7e-b164-4c8dce78ae62",
      externalLink: "https://musicbrainz.org/work/9b03dfbe-6f11-4d7e-b164-4c8dce78ae62",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Perfume",
  artist: "artist/sia",
  performed: true,
  written: "collab",
} as const satisfies Song
