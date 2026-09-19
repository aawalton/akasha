import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaOasis = {
  id: "019ea4c9-27cb-7303-8b7a-821d70b173c2",
  type: "page-type/song",
  slug: "sia-oasis",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "8e6e3b46-6ce4-4d3d-b47e-f75fd2b9cf8e",
      externalLink: "https://musicbrainz.org/work/8e6e3b46-6ce4-4d3d-b47e-f75fd2b9cf8e",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Oasis",
  artist: "artist/sia",
  songType: "original",
  performed: false,
  written: "collab",
} as const satisfies Song
