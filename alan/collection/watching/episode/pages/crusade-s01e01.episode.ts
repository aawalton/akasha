import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const crusadeS01e01 = {
  id: "01a18845-c75d-7d5f-bfae-29f32f2e1303",
  type: "page-type/episode",
  slug: "crusade-s01e01",
  description:
    "Capt. Matthew Gideon assembles the crew that will be with him on the experimental starship Excalibur. Their mission: explore the reaches of space to find a cure for the deadly Drakh virus that will overrun Earth in five years.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/crusade-season-1"],
  position: 1,
  publishedAt: "1999-06-09",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "147530",
      externalLink: "https://www.themoviedb.org/tv/2120/season/1/episode/1",
    },
  ],
  title: "War Zone",
  episodeType: "standard",
  stillPath: "/eOzlY0OwyKkUXMwm35ulejKrMNl.jpg",
  voteAverage: 7,
  createdAt: "2026-10-29T15:27:16.829Z",
  updatedAt: "2026-10-29T15:27:16.829Z",
} as const satisfies Episode
