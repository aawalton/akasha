import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayEppureSentireUnSensoDiTe = {
  id: "01a0ba5d-46c5-7255-857c-15decdf0f1ff",
  type: "page-type/song",
  slug: "coldplay-eppure-sentire-un-senso-di-te",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "c7388a02-37fa-4840-a632-abe98a0dbbe8",
      externalLink: "https://musicbrainz.org/work/c7388a02-37fa-4840-a632-abe98a0dbbe8",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Eppure sentire (Un senso di te)",
  artist: "artist/coldplay",
  performed: true,
} as const satisfies Song
