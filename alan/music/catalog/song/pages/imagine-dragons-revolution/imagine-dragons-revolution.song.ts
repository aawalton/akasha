import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const imagineDragonsRevolution = {
  id: "01a0ba8a-78b3-7663-b363-f21f5348a396",
  type: "page-type/song",
  slug: "imagine-dragons-revolution",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "fc6e50dd-839f-352a-90a5-25bdb6da7b51",
      externalLink: "https://musicbrainz.org/work/fc6e50dd-839f-352a-90a5-25bdb6da7b51",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Revolution",
  artist: "artist/imagine-dragons",
  performed: true,
} as const satisfies Song
