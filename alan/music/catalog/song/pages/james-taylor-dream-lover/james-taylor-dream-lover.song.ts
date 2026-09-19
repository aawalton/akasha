import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorDreamLover = {
  id: "01a0b72f-2960-7630-b8a7-2931525c221a",
  type: "page-type/song",
  slug: "james-taylor-dream-lover",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "8bf8cd4c-e663-3cc5-ac5d-5f2a7d56ca87",
      externalLink: "https://musicbrainz.org/work/8bf8cd4c-e663-3cc5-ac5d-5f2a7d56ca87",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Dream Lover",
  artist: "artist/james-taylor",
  performed: true,
} as const satisfies Song
