import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const babylon5S03e13 = {
  id: "01a18843-5081-7213-a4ac-146aad512b4d",
  type: "page-type/episode",
  slug: "babylon-5-s03e13",
  description:
    "A mysterious man comes to Babylon 5 dressed in chainmail and armed with a sword. His name? King Arthur - Son of Uther Pendragon, come to help when he is needed most.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/babylon-5-point-of-no-return"],
  position: 13,
  publishedAt: "1996-04-22",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "235999",
      externalLink: "https://www.themoviedb.org/tv/3137/season/3/episode/13",
    },
  ],
  title: "A Late Delivery from Avalon",
  episodeType: "standard",
  stillPath: "/uxxQ80cZxgnQvMkuI9v1CjMC1uw.jpg",
  voteAverage: 6.7,
  createdAt: "2026-10-29T15:24:35.325Z",
  updatedAt: "2026-10-29T15:24:35.325Z",
} as const satisfies Episode
