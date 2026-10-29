import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekEnterpriseS01e21 = {
  id: "01a18852-d430-757a-9a32-b168723d7dfa",
  type: "page-type/episode",
  slug: "star-trek-enterprise-s01e21",
  description:
    "While exploring a planet, Archer and Mayweather enter a “military zone” and are detained in an internment prison by an alien race called Tandarans, who are at war with the Suliban. While the Enterprise crew's previous encounters with the Suliban have been disastrous, Archer and Mayweather find themselves sharing a cell with some Suliban detainees who they believe may be wrongly imprisoned.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-enterprise-season-1"],
  position: 21,
  publishedAt: "2002-04-24",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "15556",
      externalLink: "https://www.themoviedb.org/tv/314/season/1/episode/21",
    },
  ],
  title: "Detained",
  episodeType: "standard",
  stillPath: "/zVgO6MuFsxVcZFqWUUz3TTrPHbj.jpg",
  voteAverage: 7,
  createdAt: "2026-10-29T15:41:32.079Z",
  updatedAt: "2026-10-29T15:41:32.079Z",
} as const satisfies Episode
