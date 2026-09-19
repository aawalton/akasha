import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayNapuleE = {
  id: "01a0ba5d-4a79-723b-bdda-c0fce1692d3d",
  type: "page-type/song",
  slug: "coldplay-napule-e",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "01727686-3651-4256-99ea-f8a8ca6f5768",
      externalLink: "https://musicbrainz.org/work/01727686-3651-4256-99ea-f8a8ca6f5768",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Napule è",
  artist: "artist/coldplay",
  songType: "derivative",
  performed: true,
} as const satisfies Song
