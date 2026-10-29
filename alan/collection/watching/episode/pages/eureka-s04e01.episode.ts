import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const eurekaS04e01 = {
  id: "01a18848-3733-7461-b377-035d11f6e320",
  type: "page-type/episode",
  slug: "eureka-s04e01",
  description:
    "It's Founder's Day in Eureka and everyone is in the spirit of the celebration until Jack, Allison, Henry, Jo and Fargo are transported back to 1947 where they meet some familiar faces along the way. Will they be able to get back to 2010 or will they be stuck forever in 1947 where Eureka is not a town, but an Army base.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/eureka-season-4"],
  position: 1,
  publishedAt: "2010-07-09",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "335271",
      externalLink: "https://www.themoviedb.org/tv/4620/season/4/episode/1",
    },
  ],
  title: "Founder's Day",
  episodeType: "standard",
  stillPath: "/22NOMHdwhr63BwH5KKpdEBA7bVj.jpg",
  voteAverage: 8.6,
  createdAt: "2026-10-29T15:29:56.528Z",
  updatedAt: "2026-10-29T15:29:56.528Z",
} as const satisfies Episode
