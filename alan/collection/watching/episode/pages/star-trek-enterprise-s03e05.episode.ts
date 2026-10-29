import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekEnterpriseS03e05 = {
  id: "01a18852-d432-71e8-999b-e1ae13bd6b8e",
  type: "page-type/episode",
  slug: "star-trek-enterprise-s03e05",
  description:
    "When Enterprise responds to a distress call from a Vulcan ship stranded in the Delphic Expanse, Archer and his boarding team are attacked by insane zombie-like Vulcans.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-enterprise-season-3"],
  position: 5,
  publishedAt: "2003-10-08",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "15600",
      externalLink: "https://www.themoviedb.org/tv/314/season/3/episode/5",
    },
  ],
  title: "Impulse",
  episodeType: "standard",
  stillPath: "/bNrj7YEfhxQi8abhvFWkE7VdBAq.jpg",
  voteAverage: 7.4,
  createdAt: "2026-10-29T15:41:32.079Z",
  updatedAt: "2026-10-29T15:41:32.079Z",
} as const satisfies Episode
