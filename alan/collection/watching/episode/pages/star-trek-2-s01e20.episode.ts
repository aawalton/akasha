import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrek2S01e20 = {
  id: "01a1887f-e187-7d30-a2ec-c4bbab27e453",
  type: "page-type/episode",
  slug: "star-trek-2-s01e20",
  description:
    "Captain Kirk's career is at stake when he is put on trial for the loss of a crewman during an ion storm.",
  ownLength: 50,
  ownProgress: 50,
  partOfCollections: ["season/star-trek-season-1"],
  position: 20,
  publishedAt: "1967-02-02",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "13971",
      externalLink: "https://www.themoviedb.org/tv/253/season/1/episode/20",
    },
  ],
  title: "Court Martial",
  episodeType: "standard",
  stillPath: "/lEAif04qG7Uh9n60nz7wPtKQy34.jpg",
  voteAverage: 7.3,
  createdAt: "2026-10-29T16:30:44.613Z",
  updatedAt: "2026-10-29T16:30:44.613Z",
} as const satisfies Episode
