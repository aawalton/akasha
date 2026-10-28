import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const narutoS03e120 = {
  id: "01a183d1-bb53-75ba-879d-3ba68c7f2854",
  type: "page-type/episode",
  slug: "naruto-s03e120",
  description:
    "Faced against the vicious twin duo of Sakon and Ukon, Kiba and Akamaru team up to take them out, using their most powerful jutsu.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/naruto-season-3"],
  position: 120,
  publishedAt: "2005-02-02",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "908097",
      externalLink: "https://www.themoviedb.org/tv/46260/season/3/episode/120",
    },
  ],
  title: "Roar and Howl! The Ultimate Tag-Team!",
  episodeType: "standard",
  stillPath: "/7yJ0zokKrt05FrYC0vI3s1WVGGb.jpg",
  voteAverage: 7.5,
  createdAt: "2026-10-28T18:42:02.697Z",
  updatedAt: "2026-10-28T18:42:02.697Z",
} as const satisfies Episode
