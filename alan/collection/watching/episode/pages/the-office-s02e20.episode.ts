import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theOfficeS02e20 = {
  id: "01a18857-c367-7727-b78d-71fb9dbbd5fa",
  type: "page-type/episode",
  slug: "the-office-s02e20",
  description:
    "Dwight plays the role of Volunteer Sheriff after finding half a joint in the Dunder Mifflin parking lot leading to an investigation. Pam gives Jim a play challenge where he must be silent until he gives Pam a can of Coke.",
  ownLength: 22,
  ownProgress: 0,
  partOfCollections: ["season/the-office-season-2"],
  position: 20,
  publishedAt: "2006-04-27",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "170147",
      externalLink: "https://www.themoviedb.org/tv/2316/season/2/episode/20",
    },
  ],
  title: "Drug Testing",
  episodeType: "standard",
  stillPath: "/e2JsVFkqtvJahNJHc42Xck86en2.jpg",
  voteAverage: 8.2,
  createdAt: "2026-10-29T15:46:55.461Z",
  updatedAt: "2026-10-29T15:46:55.461Z",
} as const satisfies Episode
