import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrek2S03e04 = {
  id: "01a1887f-e18a-7148-b3c0-65d1859a0c7a",
  type: "page-type/episode",
  slug: "star-trek-2-s03e04",
  description:
    "On a distant planet, Kirk, Spock and McCoy find a scientific team dead, and their children who, unknown to the crew, have great powers at their disposal.",
  ownLength: 51,
  ownProgress: 51,
  partOfCollections: ["season/star-trek-season-3"],
  position: 4,
  publishedAt: "1968-10-11",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "14015",
      externalLink: "https://www.themoviedb.org/tv/253/season/3/episode/4",
    },
  ],
  title: "And the Children Shall Lead",
  episodeType: "standard",
  stillPath: "/wSNJaUrcKoAZe5TnTXBZ00CPOWp.jpg",
  voteAverage: 5.8,
  createdAt: "2026-10-29T16:30:44.613Z",
  updatedAt: "2026-10-29T16:30:44.613Z",
} as const satisfies Episode
