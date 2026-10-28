import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const pandoraHearts = {
  id: "01a183db-4318-7cfc-bc74-f747e62220af",
  type: "page-type/show",
  slug: "pandora-hearts",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["fandom/pandorahearts"],
  publishedAt: "2009-04-02",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    { source: "tmdb", externalId: "35971", externalLink: "https://www.themoviedb.org/tv/35971" },
  ],
  title: "Pandora Hearts",
  createdAt: "2026-10-28T18:52:27.286Z",
  updatedAt: "2026-10-28T18:52:27.286Z",
} as const satisfies Show
