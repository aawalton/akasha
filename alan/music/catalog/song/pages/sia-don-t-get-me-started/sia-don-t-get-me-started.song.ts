import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaDonTGetMeStarted = {
  id: "019ea4c5-f99d-780d-a31e-432b8641c231",
  type: "page-type/song",
  slug: "sia-don-t-get-me-started",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "d44384b6-8bdf-44a9-afb2-4a2c0089165f",
      externalLink: "https://musicbrainz.org/work/d44384b6-8bdf-44a9-afb2-4a2c0089165f",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Don’t Get Me Started",
  artist: "artist/sia",
  performed: true,
  written: "collab",
} as const satisfies Song
