import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorStraightenUpAndFlyRight = {
  id: "01a0b72f-4b32-799c-9d01-3ae36c3ad6c3",
  type: "page-type/song",
  slug: "james-taylor-straighten-up-and-fly-right",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "460d2550-eb9d-34c4-b376-130a2e5a8cd3",
      externalLink: "https://musicbrainz.org/work/460d2550-eb9d-34c4-b376-130a2e5a8cd3",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Straighten Up and Fly Right",
  artist: "artist/james-taylor",
  performed: true,
  createdAt: "2026-09-19T01:02:05.106Z",
  updatedAt: "2026-09-19T16:23:44.000Z",
} as const satisfies Song
