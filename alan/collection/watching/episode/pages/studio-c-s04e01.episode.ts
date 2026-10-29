import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const studioCS04e01 = {
  id: "01a18885-00fa-77bb-aaaf-bbc7dc195430",
  type: "page-type/episode",
  slug: "studio-c-s04e01",
  description:
    "The Studio C cast starts off Season 4 with a simple elevator ride, the crew on the Starship Enterprise takes a major fall, and the mad scientist invents his most terrifying creation yet.",
  ownLength: 24,
  ownProgress: 24,
  partOfCollections: ["season/studio-c-season-4"],
  position: 1,
  publishedAt: "2014-04-07",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "3721776",
      externalLink: "https://www.themoviedb.org/tv/68207/season/4/episode/1",
    },
  ],
  title: "Season 4 Episode 1",
  episodeType: "standard",
  stillPath: "/2ODyd9nkMK5CtSIw9PGPqm5GhFx.jpg",
  voteAverage: 0,
  createdAt: "2026-10-29T16:36:20.344Z",
  updatedAt: "2026-10-29T16:36:20.344Z",
} as const satisfies Episode
