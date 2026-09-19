import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallAwayInAManger = {
  id: "01a0b717-5484-735d-af84-9c9cd83fc4a2",
  type: "page-type/song",
  slug: "paul-cardall-away-in-a-manger",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "88da69bc-6e65-39bd-ac62-6a0df2c86d29",
      externalLink: "https://musicbrainz.org/work/88da69bc-6e65-39bd-ac62-6a0df2c86d29",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Away in a Manger",
  artist: "artist/paul-cardall",
  songType: "derivative",
  performed: true,
} as const satisfies Song
