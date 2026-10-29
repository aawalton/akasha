import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const skeletonCrewS02e02 = {
  id: "01a18852-196a-7aeb-819b-a7c7666ba13c",
  type: "page-type/episode",
  slug: "skeleton-crew-s02e02",
  description:
    "The day after the Halloween party, Anthony and Hunter look to move forward with their fresh start. Veronica and Glenn hold auditions for Veronica's next show, where Appolina makes a new friend. And Horatio faces some harsh realities, which leads to the introduction of an old friend of Anthony's.",
  ownLength: 26,
  ownProgress: 0,
  partOfCollections: ["season/skeleton-crew-season-2"],
  position: 2,
  publishedAt: "2016-11-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4380459",
      externalLink: "https://www.themoviedb.org/tv/225011/season/2/episode/2",
    },
  ],
  title: "Cut to the Bone",
  episodeType: "standard",
  voteAverage: 0,
  createdAt: "2026-10-29T15:40:44.264Z",
  updatedAt: "2026-10-29T15:40:44.264Z",
} as const satisfies Episode
