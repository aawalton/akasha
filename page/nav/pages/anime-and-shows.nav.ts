import type { Nav } from "akasha/page/nav/nav.page-type.types.ts"

export const animeAndShows = {
  id: "01a06577-2613-7002-b948-ecff78394ae7",
  type: "page-type/nav",
  slug: "anime-and-shows",
  title: "Anime & Shows",
  icon: "tv",
  navPlace: 3,
  app: "web-app/archive-of-worlds-web",
} as const satisfies Nav
