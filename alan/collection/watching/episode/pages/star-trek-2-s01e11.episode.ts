import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrek2S01e11 = {
  id: "01a1887f-e186-7183-b3f8-4ee68639548f",
  type: "page-type/episode",
  slug: "star-trek-2-s01e11",
  description:
    "Apparently summoned to Star Base 11, Kirk, Spock and McCoy visit a former Enterprise Commander, the paralyzed and horribly disfigured Christopher Pike. Uncharacteristically, Spock commandeers the Enterprise, then turns himself in for court martial.",
  ownLength: 49,
  ownProgress: 49,
  partOfCollections: ["season/star-trek-season-1"],
  position: 11,
  publishedAt: "1966-11-17",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "13982",
      externalLink: "https://www.themoviedb.org/tv/253/season/1/episode/11",
    },
  ],
  title: "The Menagerie (1)",
  episodeType: "standard",
  stillPath: "/eNKqIb3NWHN3JWp35UyQzGcuX7a.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-29T16:30:44.613Z",
  updatedAt: "2026-10-29T16:30:44.613Z",
} as const satisfies Episode
