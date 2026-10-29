import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekEnterpriseS03e22 = {
  id: "01a18852-d433-7ba1-8666-115d684bb58e",
  type: "page-type/episode",
  slug: "star-trek-enterprise-s03e22",
  description:
    "Archer and Hoshi stand before the Xindi Council as T'Pol and Reed lead a team into the heart of a Sphere.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-enterprise-season-3"],
  position: 22,
  publishedAt: "2004-05-12",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "15590",
      externalLink: "https://www.themoviedb.org/tv/314/season/3/episode/22",
    },
  ],
  title: "The Council",
  episodeType: "standard",
  stillPath: "/zhHeIspudtQfBO0VpCrb1VvJyEG.jpg",
  voteAverage: 8.2,
  createdAt: "2026-10-29T15:41:32.079Z",
  updatedAt: "2026-10-29T15:41:32.079Z",
} as const satisfies Episode
