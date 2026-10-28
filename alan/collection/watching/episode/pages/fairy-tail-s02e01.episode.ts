import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const fairyTailS02e01 = {
  id: "01a183d7-2651-7c1c-9c16-1b6e72bb706b",
  type: "page-type/episode",
  slug: "fairy-tail-s02e01",
  description:
    'A reporter from "The Weekly Sorcerer" comes to interview Fairy Tail. Cana tells Lucy that she will have a fateful encounter.',
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/fairy-tail-season-2"],
  position: 1,
  publishedAt: "2010-10-11",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "908247",
      externalLink: "https://www.themoviedb.org/tv/46261/season/2/episode/1",
    },
  ],
  title: "The Day of the Fateful Encounter",
  episodeType: "standard",
  stillPath: "/jsSiiO4E0o9FGCD2asSiKTAFZbl.jpg",
  voteAverage: 8.7,
  createdAt: "2026-10-28T18:47:57.774Z",
  updatedAt: "2026-10-28T18:47:57.774Z",
} as const satisfies Episode
