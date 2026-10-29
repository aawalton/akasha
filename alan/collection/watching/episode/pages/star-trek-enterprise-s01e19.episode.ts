import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekEnterpriseS01e19 = {
  id: "01a18852-d430-761d-b406-d087776b82b9",
  type: "page-type/episode",
  slug: "star-trek-enterprise-s01e19",
  description:
    "Enterprise encounters Ferengi pirates who use a booby-trapped artifact to gas the crew into unconsciousness, then pillage the ship for treasures. But they haven't counted on Tucker, who happens to be in the decon chamber and avoids the gas, and attempts to win back the ship from the pirates.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-enterprise-season-1"],
  position: 19,
  publishedAt: "2002-03-27",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "15554",
      externalLink: "https://www.themoviedb.org/tv/314/season/1/episode/19",
    },
  ],
  title: "Acquisition",
  episodeType: "standard",
  stillPath: "/4JrImkT0XJizuG5oKO7JpWSlI5v.jpg",
  voteAverage: 6.9,
  createdAt: "2026-10-29T15:41:32.079Z",
  updatedAt: "2026-10-29T15:41:32.079Z",
} as const satisfies Episode
