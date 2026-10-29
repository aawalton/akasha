import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const warehouse13S03e01 = {
  id: "01a18859-8870-73e0-8bca-620a81349cf9",
  type: "page-type/episode",
  slug: "warehouse-13-s03e01",
  description:
    "When we last left agents Myka Bering and Pete Lattimer at the conclusion of season 2, Myka had decided to leave the top secret team with little to no warning. As season 3 begins, Artie fills Myka's shoes with 'The New Guy,' which also happens to be the name of the season premiere episode.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/warehouse-13-season-3"],
  position: 1,
  publishedAt: "2011-07-11",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "541595",
      externalLink: "https://www.themoviedb.org/tv/15819/season/3/episode/1",
    },
  ],
  title: "The New Guy",
  episodeType: "standard",
  stillPath: "/w1kQz7EKM9OcWX5NCmUhFm21zue.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-29T15:48:51.438Z",
  updatedAt: "2026-10-29T15:48:51.438Z",
} as const satisfies Episode
