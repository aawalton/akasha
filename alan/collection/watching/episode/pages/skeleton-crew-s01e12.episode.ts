import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const skeletonCrewS01e12 = {
  id: "01a18852-196a-7314-af45-1ac0867e360a",
  type: "page-type/episode",
  slug: "skeleton-crew-s01e12",
  description:
    "Opening night has arrived, but Appolina learns some troubling news which complicates events for both Veronica and Gina. Aaron gets a surprise at work and finds his world turned further upside down. Eddie experiences a great loss. Hunter and Anthony find their lives taking one step forward, only to take two steps back. Season Finale.",
  ownLength: 31,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-skeleton-crew-season-1"],
  position: 12,
  publishedAt: "2016-02-07",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4380457",
      externalLink: "https://www.themoviedb.org/tv/225011/season/1/episode/12",
    },
  ],
  title: "Bare Bones",
  episodeType: "finale",
  voteAverage: 0,
  createdAt: "2026-10-29T15:40:44.264Z",
  updatedAt: "2026-10-29T15:40:44.264Z",
} as const satisfies Episode
