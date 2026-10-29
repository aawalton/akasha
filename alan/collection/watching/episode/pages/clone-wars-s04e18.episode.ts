import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const cloneWarsS04e18 = {
  id: "01a18844-6110-7576-96cf-77f564fe5c46",
  type: "page-type/episode",
  slug: "clone-wars-s04e18",
  description:
    "The Chancellor travels to Naboo to preside over a public ceremony, guarded by Jedi Knights. Dooku and his bounty hunters -- including an undercover Obi-Wan Kenobi -- launch their kidnapping plot.",
  ownLength: 22,
  ownProgress: 0,
  partOfCollections: ["season/clone-wars-season-4"],
  position: 18,
  publishedAt: "2012-02-10",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "286683",
      externalLink: "https://www.themoviedb.org/tv/4194/season/4/episode/18",
    },
  ],
  title: "Crisis on Naboo",
  episodeType: "standard",
  stillPath: "/5taNGTTDoWsODCzYAxPgVnmpxSn.jpg",
  voteAverage: 8.4,
  createdAt: "2026-10-29T15:25:45.098Z",
  updatedAt: "2026-10-29T15:25:45.098Z",
} as const satisfies Episode
