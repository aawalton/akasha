import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const alexandriaMinor = {
  id: "01a0b726-8f40-730b-a447-be78d40bb51d",
  type: "page-type/song",
  slug: "alexandria-minor",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "fbff7af9-96cc-4d3f-84f2-1d4cb9f3cfa9",
      externalLink: "https://musicbrainz.org/recording/fbff7af9-96cc-4d3f-84f2-1d4cb9f3cfa9",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Аллегро А-minor",
  artist: "artist/alexandria",
  songType: "original",
  performed: true,
} as const satisfies Song
