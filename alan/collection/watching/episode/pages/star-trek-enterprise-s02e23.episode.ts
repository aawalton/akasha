import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekEnterpriseS02e23 = {
  id: "01a18852-d432-7695-820e-02557f212dac",
  type: "page-type/episode",
  slug: "star-trek-enterprise-s02e23",
  description:
    "The remnants of an alien ship and two frozen cybernetic bodies are uncovered in the arctic by a research team. These aliens soon thaw out and flee Earth, taking the research team with them. Starfleet orders Enterprise to find them, but the crew aren't prepared for just how dangerous these aliens really are.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-enterprise-season-2"],
  position: 23,
  publishedAt: "2003-05-07",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "15576",
      externalLink: "https://www.themoviedb.org/tv/314/season/2/episode/23",
    },
  ],
  title: "Regeneration",
  episodeType: "standard",
  stillPath: "/9I78L9QazIWqYoD7PBJrbLZwvht.jpg",
  voteAverage: 8.2,
  createdAt: "2026-10-29T15:41:32.079Z",
  updatedAt: "2026-10-29T15:41:32.079Z",
} as const satisfies Episode
