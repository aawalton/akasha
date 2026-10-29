import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekVoyagerS04e21 = {
  id: "01a18853-ac8e-7d67-87e1-4a9fed33699d",
  type: "page-type/episode",
  slug: "star-trek-voyager-s04e21",
  description:
    "Stardate: 51781.2. When the Voyager computer detects a mysterious, powerful, and extremely dangerous substance, Janeway must risk all to attempt destroying it.",
  ownLength: 46,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-voyager-season-4"],
  position: 21,
  publishedAt: "1998-04-15",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "113182",
      externalLink: "https://www.themoviedb.org/tv/1855/season/4/episode/21",
    },
  ],
  title: "The Omega Directive",
  episodeType: "standard",
  stillPath: "/pmcn6R6NoQY0vSVU6NAZrVD78hE.jpg",
  voteAverage: 7.2,
  createdAt: "2026-10-29T15:42:27.464Z",
  updatedAt: "2026-10-29T15:42:27.464Z",
} as const satisfies Episode
