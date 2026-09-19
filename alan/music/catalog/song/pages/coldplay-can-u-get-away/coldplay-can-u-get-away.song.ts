import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayCanUGetAway = {
  id: "01a0ba5d-44ed-768f-81d4-415f14554fc8",
  type: "page-type/song",
  slug: "coldplay-can-u-get-away",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "b4ffd5f0-5720-44d6-9ab7-4823499c312e",
      externalLink: "https://musicbrainz.org/work/b4ffd5f0-5720-44d6-9ab7-4823499c312e",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Can U Get Away",
  artist: "artist/coldplay",
  performed: true,
} as const satisfies Song
