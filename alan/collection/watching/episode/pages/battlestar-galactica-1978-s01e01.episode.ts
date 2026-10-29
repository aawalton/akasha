import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const battlestarGalactica1978S01e01 = {
  id: "01a18843-67a4-787d-be22-3f7ba94efa9f",
  type: "page-type/episode",
  slug: "battlestar-galactica-1978-s01e01",
  description:
    "The Cylon Empire tricks the Twelve Colonies into believing they are striving for peace.  Then they ambush the unprepared colonies and destroy the military's Battlestar fleet. One surviving Battlestar, the Galactica, under the command of Commander Adama, gathers the remaining humans and leads them in the search for the legendary 13th colony called Earth.",
  ownLength: 134,
  ownProgress: 0,
  partOfCollections: ["season/battlestar-galactica-season-1"],
  position: 1,
  publishedAt: "1978-09-17",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "972256",
      externalLink: "https://www.themoviedb.org/tv/501/season/1/episode/1",
    },
  ],
  title: "Saga of a Star World",
  episodeType: "standard",
  stillPath: "/9vzu8kMU2MoShqZOoQ76CLbfrsE.jpg",
  voteAverage: 7.6,
  createdAt: "2026-10-29T15:24:41.252Z",
  updatedAt: "2026-10-29T15:24:41.252Z",
} as const satisfies Episode
