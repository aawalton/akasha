import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaCutToTheChase = {
  id: "019ea4c5-de52-7b77-a2fb-16a5687e1868",
  type: "page-type/song",
  slug: "sia-cut-to-the-chase",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "cbfb9f7f-9fd0-4468-a404-53c24e030373",
      externalLink: "https://musicbrainz.org/work/cbfb9f7f-9fd0-4468-a404-53c24e030373",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Cut to the Chase",
  artist: "artist/sia",
  songType: "original",
  performed: false,
  written: "collab",
} as const satisfies Song
