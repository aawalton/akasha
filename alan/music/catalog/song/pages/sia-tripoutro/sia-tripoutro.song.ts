import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaTripoutro = {
  id: "019ea4ca-a8a4-7196-b107-8d0750b2c436",
  type: "page-type/song",
  slug: "sia-tripoutro",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "0c8a4339-b759-4319-8d3f-0faae7580253",
      externalLink: "https://musicbrainz.org/work/0c8a4339-b759-4319-8d3f-0faae7580253",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Tripoutro",
  artist: "artist/sia",
  songType: "original",
  performed: true,
  written: "solo",
} as const satisfies Song
