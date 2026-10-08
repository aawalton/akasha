import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysStillStillStill = {
  id: "01a0b71e-9a2e-71a7-a88c-37c128c9c8f6",
  type: "page-type/song",
  slug: "the-piano-guys-still-still-still",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "525f56ca-d3f6-4392-88b5-e02ecfcd1dca",
      externalLink: "https://musicbrainz.org/work/525f56ca-d3f6-4392-88b5-e02ecfcd1dca",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Still, Still, Still",
  artist: "artist/the-piano-guys",
  performed: true,
  createdAt: "2026-09-19T00:43:51.214Z",
  updatedAt: "2026-09-19T16:45:30.000Z",
} as const satisfies Song
