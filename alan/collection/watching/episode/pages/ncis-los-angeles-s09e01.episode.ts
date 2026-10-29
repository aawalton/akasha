import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisLosAngelesS09e01 = {
  id: "01a1884a-e0f1-7dd6-bb82-43e2fc3e8d3b",
  type: "page-type/episode",
  slug: "ncis-los-angeles-s09e01",
  description:
    "Season 9 begins with Hetty turning in retirement papers and disappearing. A new executive director arrives and immediately makes staffing changes. Meanwhile, Sam, still mourning his wife’s death, insists that Callen find a new partner.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-los-angeles-season-9"],
  position: 1,
  publishedAt: "2017-10-01",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1356496",
      externalLink: "https://www.themoviedb.org/tv/17610/season/9/episode/1",
    },
  ],
  title: "Party Crashers",
  episodeType: "standard",
  stillPath: "/xzn0e3iZOXy0yaPb6MqQ7B9dXmq.jpg",
  voteAverage: 6.2,
  createdAt: "2026-10-29T15:32:51.047Z",
  updatedAt: "2026-10-29T15:32:51.047Z",
} as const satisfies Episode
