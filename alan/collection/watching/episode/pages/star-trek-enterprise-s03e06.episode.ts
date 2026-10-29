import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekEnterpriseS03e06 = {
  id: "01a18852-d432-7b87-aca7-01e1580f97db",
  type: "page-type/episode",
  slug: "star-trek-enterprise-s03e06",
  description:
    "A powerful telepath makes contact with Hoshi and offers to help Enterprise find the Xindi ... for a price.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-enterprise-season-3"],
  position: 6,
  publishedAt: "2003-10-15",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "15604",
      externalLink: "https://www.themoviedb.org/tv/314/season/3/episode/6",
    },
  ],
  title: "Exile",
  episodeType: "standard",
  stillPath: "/ahnyDrKgsZeIzmt9Q86DX30SuAi.jpg",
  voteAverage: 7.2,
  createdAt: "2026-10-29T15:41:32.079Z",
  updatedAt: "2026-10-29T15:41:32.079Z",
} as const satisfies Episode
