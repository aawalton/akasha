import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayShiningLight = {
  id: "01a0ba5d-4baa-79bc-a487-b8b84c198e4b",
  type: "page-type/song",
  slug: "coldplay-shining-light",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "0c0da16d-3ae0-49a5-bde7-efb2dc6da9b2",
      externalLink: "https://musicbrainz.org/work/0c0da16d-3ae0-49a5-bde7-efb2dc6da9b2",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Shining Light",
  artist: "artist/coldplay",
  performed: true,
} as const satisfies Song
