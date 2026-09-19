import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallOComeOComeEmmanuel = {
  id: "01a0b717-51ae-7aba-9974-e4bb68836344",
  type: "page-type/song",
  slug: "paul-cardall-o-come-o-come-emmanuel",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "23122c2f-fe8c-4643-9951-313442af1c07",
      externalLink: "https://musicbrainz.org/work/23122c2f-fe8c-4643-9951-313442af1c07",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "O Come, O Come Emmanuel",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
