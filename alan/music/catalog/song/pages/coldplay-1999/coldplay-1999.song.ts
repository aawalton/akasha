import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplay1999 = {
  id: "01a0ba5d-3977-7c2f-bc5c-bb95174ca0b3",
  type: "page-type/song",
  slug: "coldplay-1999",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "15fe7352-dfea-3452-90a4-1412c93386e2",
      externalLink: "https://musicbrainz.org/work/15fe7352-dfea-3452-90a4-1412c93386e2",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "1999",
  artist: "artist/coldplay",
  songType: "derivative",
  performed: true,
} as const satisfies Song
