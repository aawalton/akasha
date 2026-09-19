import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaMadLove = {
  id: "019ea4c8-ca31-7f01-b8de-b5c00ef58e70",
  type: "page-type/song",
  slug: "sia-mad-love",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "85cd7e4e-b1da-4e2c-921e-71c0d26912d5",
      externalLink: "https://musicbrainz.org/work/85cd7e4e-b1da-4e2c-921e-71c0d26912d5",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Mad Love",
  artist: "artist/sia",
  performed: true,
  written: "solo",
} as const satisfies Song
