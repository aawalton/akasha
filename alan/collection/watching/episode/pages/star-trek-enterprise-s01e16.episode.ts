import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekEnterpriseS01e16 = {
  id: "01a18852-d430-7d35-9105-d594cd4ff1ac",
  type: "page-type/episode",
  slug: "star-trek-enterprise-s01e16",
  description:
    "Tucker and Reed set out on a mission in a shuttlepod, as Enterprise is busy investigating an asteroid field. Disaster strikes while the pair are away, leaving the shuttlepod damaged and the warp drive inoperable. They manage to make it back to the rendezvous coordinates only to discover Enterprise was apparently destroyed when it crashed into an asteroid. With the ship seemingly no more, the pair are left abandoned in the middle of nowhere with only a few days of air remaining.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-enterprise-season-1"],
  position: 16,
  publishedAt: "2002-02-13",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "15551",
      externalLink: "https://www.themoviedb.org/tv/314/season/1/episode/16",
    },
  ],
  title: "Shuttlepod One",
  episodeType: "standard",
  stillPath: "/hwfkIqtywXObvg4anIDMZFxXf57.jpg",
  voteAverage: 7.2,
  createdAt: "2026-10-29T15:41:32.079Z",
  updatedAt: "2026-10-29T15:41:32.079Z",
} as const satisfies Episode
