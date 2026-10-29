import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisNewOrleansS02e17 = {
  id: "01a1884b-3017-77fd-8ca5-733077cb0d9a",
  type: "page-type/episode",
  slug: "ncis-new-orleans-s02e17",
  description:
    "A Navy Captain ends up being murdered during an appearance on a local radio show. Pride's daughter returns home to discuss her plans for the future.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-new-orleans-season-2"],
  position: 17,
  publishedAt: "2016-03-01",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1169281",
      externalLink: "https://www.themoviedb.org/tv/61387/season/2/episode/17",
    },
  ],
  title: "Radio Silence",
  episodeType: "standard",
  stillPath: "/gFSnSiTag1Wdg13UfYyrm45665X.jpg",
  voteAverage: 7,
  createdAt: "2026-10-29T15:33:11.316Z",
  updatedAt: "2026-10-29T15:33:11.316Z",
} as const satisfies Episode
