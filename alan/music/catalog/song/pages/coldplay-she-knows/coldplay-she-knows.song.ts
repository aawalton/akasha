import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplaySheKnows = {
  id: "01a0ba60-fd4d-7cda-aad5-eea89e084c34",
  type: "page-type/song",
  slug: "coldplay-she-knows",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "ea78cfa8-b058-4631-88c0-ce4ca63f1e2e",
      externalLink: "https://musicbrainz.org/work/ea78cfa8-b058-4631-88c0-ce4ca63f1e2e",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "She Knows",
  artist: "artist/coldplay",
  performed: true,
} as const satisfies Song
