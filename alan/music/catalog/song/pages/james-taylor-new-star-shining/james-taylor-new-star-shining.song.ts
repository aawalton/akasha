import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorNewStarShining = {
  id: "01a0b72f-4021-7da0-928a-b90f4a5ae8c1",
  type: "page-type/song",
  slug: "james-taylor-new-star-shining",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "c478cefd-b8f5-4e54-931f-0d29b881f50e",
      externalLink: "https://musicbrainz.org/work/c478cefd-b8f5-4e54-931f-0d29b881f50e",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "New Star Shining",
  artist: "artist/james-taylor",
  songType: "derivative",
  performed: true,
} as const satisfies Song
