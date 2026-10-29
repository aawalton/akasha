import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const cloneWarsS05e07 = {
  id: "01a18844-6111-7457-94f8-65c4081e40bc",
  type: "page-type/episode",
  slug: "clone-wars-s05e07",
  description:
    "As the younglings return from Ilum with Ahsoka, their ship comes under attack by Hondo's gang of pirates. The children must use ingenious and improvised traps to thwart the brigands.",
  ownLength: 22,
  ownProgress: 0,
  partOfCollections: ["season/clone-wars-season-5"],
  position: 7,
  publishedAt: "2012-11-10",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1010368",
      externalLink: "https://www.themoviedb.org/tv/4194/season/5/episode/7",
    },
  ],
  title: "A Test of Strength",
  episodeType: "standard",
  stillPath: "/aVTPWIQIA1ivZ0zf62HjcENnZi1.jpg",
  voteAverage: 8.1,
  createdAt: "2026-10-29T15:25:45.098Z",
  updatedAt: "2026-10-29T15:25:45.098Z",
} as const satisfies Episode
