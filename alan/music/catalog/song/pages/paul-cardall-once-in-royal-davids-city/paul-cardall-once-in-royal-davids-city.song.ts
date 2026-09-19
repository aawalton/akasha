import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallOnceInRoyalDavidsCity = {
  id: "01a0b717-531c-7fe4-ae01-f51049af8c8a",
  type: "page-type/song",
  slug: "paul-cardall-once-in-royal-davids-city",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "37de7c6c-9f2d-385d-b04c-0567d038dc57",
      externalLink: "https://musicbrainz.org/work/37de7c6c-9f2d-385d-b04c-0567d038dc57",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Once in Royal David’s City",
  artist: "artist/paul-cardall",
  songType: "derivative",
  performed: true,
} as const satisfies Song
