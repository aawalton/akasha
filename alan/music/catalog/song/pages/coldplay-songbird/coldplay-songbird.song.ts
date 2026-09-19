import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplaySongbird = {
  id: "01a0ba5d-4e6f-7e28-8b6b-902c4a8528a7",
  type: "page-type/song",
  slug: "coldplay-songbird",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "3c84f0c9-2b68-3a94-8d21-5ee202ea2a73",
      externalLink: "https://musicbrainz.org/work/3c84f0c9-2b68-3a94-8d21-5ee202ea2a73",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Songbird",
  artist: "artist/coldplay",
  songType: "derivative",
  performed: true,
} as const satisfies Song
