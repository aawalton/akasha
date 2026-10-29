import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const arcaneS02e01 = {
  id: "01a1887d-dc26-7b32-b879-98598788c715",
  type: "page-type/episode",
  slug: "arcane-s02e01",
  description:
    "Vi and Caitlyn wrestle with how best to respond in the wake of a terrible tragedy that claims lives — and escalates tensions between the twin cities.",
  ownLength: 41,
  ownProgress: 41,
  partOfCollections: ["season/arcane-season-2"],
  position: 1,
  publishedAt: "2024-11-09",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "5608924",
      externalLink: "https://www.themoviedb.org/tv/94605/season/2/episode/1",
    },
  ],
  title: "Heavy Is the Crown",
  episodeType: "standard",
  stillPath: "/AKzTyLJkQEuftVNIuh0gcJCbDl.jpg",
  voteAverage: 8.2,
  createdAt: "2026-10-29T16:28:32.165Z",
  updatedAt: "2026-10-29T16:28:32.165Z",
} as const satisfies Episode
