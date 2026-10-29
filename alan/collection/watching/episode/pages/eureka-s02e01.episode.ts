import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const eurekaS02e01 = {
  id: "01a18848-3731-7095-b8e1-cb056a4f05ff",
  type: "page-type/episode",
  slug: "eureka-s02e01",
  description:
    "Taggart's theory is that solar flares caused by the eclipse, or the 'Phoenix Effect', are to blame when people start to spontaneously combust.  When Carter discovers that a blast of radiation from the artifact had penetrated the wall of the chamber and is actually to blame for the spontaneous combustion, it becomes a race against time to save the other two people exposed - Nathan and Kevin!",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/eureka-season-2"],
  position: 1,
  publishedAt: "2007-07-10",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "335240",
      externalLink: "https://www.themoviedb.org/tv/4620/season/2/episode/1",
    },
  ],
  title: "Phoenix Rising",
  episodeType: "standard",
  stillPath: "/suUbmO271jg7jR0J7ddaBNNtzpj.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T15:29:56.528Z",
  updatedAt: "2026-10-29T15:29:56.528Z",
} as const satisfies Episode
