import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const sylviaDaleyProximity = {
  id: "01a0b725-ae06-7b11-8d45-1b72785cc2c0",
  type: "page-type/song",
  slug: "sylvia-daley-proximity",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "5cfa6295-98f5-4d19-93eb-870874904de8",
      externalLink: "https://musicbrainz.org/work/5cfa6295-98f5-4d19-93eb-870874904de8",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Proximity",
  artist: "artist/sylvia-daley",
  songType: "original",
  performed: false,
  written: "collab",
} as const satisfies Song
