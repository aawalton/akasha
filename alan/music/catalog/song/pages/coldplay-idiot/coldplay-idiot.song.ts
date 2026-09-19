import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayIdiot = {
  id: "01a0ba5d-48f5-77ab-ac23-ac67d7720b49",
  type: "page-type/song",
  slug: "coldplay-idiot",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "e1d02f1d-81f5-49ba-8063-00f2f250e6db",
      externalLink: "https://musicbrainz.org/work/e1d02f1d-81f5-49ba-8063-00f2f250e6db",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Idiot",
  artist: "artist/coldplay",
  performed: true,
} as const satisfies Song
